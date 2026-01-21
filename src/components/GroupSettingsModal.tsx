/**
 * 分组管理弹窗组件
 * 只允许修改固定4个分组的名称
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Package } from 'lucide-react';
import {
  getGroupSettings,
  saveGroupSettings,
} from '../services/groupService';
import { getModelDisplayName, getDefaultGroups } from '../utils/modelNames';
import './GroupSettingsModal.css';

interface GroupSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GroupData {
  id: string;
  name: string;
  models: string[];
}

export const GroupSettingsModal: React.FC<GroupSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取固定的默认分组配置
  const getFixedGroups = useCallback((): GroupData[] => {
    const defaultGroups = getDefaultGroups();
    return defaultGroups.map(group => ({
      id: group.id,
      name: group.name,
      models: group.desktopModels, // 使用桌面端模型 ID
    }));
  }, []);

  // 加载分组配置（合并已保存的名称）
  const loadSettings = useCallback(async () => {
    try {
      const data = await getGroupSettings();
      const fixedGroups = getFixedGroups();
      
      // 使用保存的分组名（如果有的话）
      const loadedGroups = fixedGroups.map(group => ({
        ...group,
        name: data.groupNames[group.id] || group.name,
      }));
      
      setGroups(loadedGroups);
      setError(null);
    } catch (err) {
      console.error('Failed to load group settings:', err);
      // 加载失败时使用默认配置
      setGroups(getFixedGroups());
      setError(null);
    }
  }, [getFixedGroups]);

  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen, loadSettings]);

  // 修改分组名称
  const handleGroupNameChange = (groupId: string, newName: string) => {
    setGroups(groups.map(g => 
      g.id === groupId ? { ...g, name: newName } : g
    ));
  };

  // 保存配置
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    
    try {
      const groupMappings: Record<string, string> = {};
      const groupNames: Record<string, string> = {};
      const groupOrder: string[] = [];
      
      for (const group of groups) {
        groupOrder.push(group.id);
        groupNames[group.id] = group.name;
        for (const modelId of group.models) {
          groupMappings[modelId] = group.id;
        }
      }
      
      await saveGroupSettings(groupMappings, groupNames, groupOrder);
      onClose();
    } catch (err) {
      console.error('Failed to save group settings:', err);
      setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal group-settings-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <Package size={20} />
            {t('group_settings.title', '分组管理')}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          {/* 错误提示 */}
          {error && (
            <div className="group-settings-error">
              {error}
            </div>
          )}
          
          {/* 分组列表 */}
          <div className="group-list-section">
            <h3>
              <Package size={16} />
              {t('group_settings.group_list', '分组列表')}
            </h3>
            
            <div className="group-list">
              {groups.map(group => (
                <div key={group.id} className="group-item">
                  <div className="group-header">
                    <Package size={16} className="group-icon" />
                    <input
                      type="text"
                      value={group.name}
                      onChange={e => handleGroupNameChange(group.id, e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          handleSave();
                        }
                      }}
                      className="group-name-input"
                      placeholder={t('group_settings.group_name_placeholder', '分组名称')}
                    />
                  </div>
                  
                  <div className="group-models">
                    {group.models.map(modelId => (
                      <span key={modelId} className="model-tag readonly" title={modelId}>
                        {getModelDisplayName(modelId)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={saving}>
            {t('common.cancel', '取消')}
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? t('common.saving', '保存中...') : t('group_settings.save', '保存分组')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupSettingsModal;
