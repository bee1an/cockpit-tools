/**
 * 模型名称工具
 * 用于将模型 ID 转换为友好的显示名称
 * 
 * 注意：桌面端使用小写格式（如 gemini-3-flash），插件端使用大写格式（如 MODEL_PLACEHOLDER_M18）
 */

/** 模型 ID 到显示名称的映射（支持两种格式） */
const MODEL_DISPLAY_NAMES: Record<string, string> = {
  // 桌面端格式（小写）
  'claude-opus-4-5-thinking': 'Claude Opus 4.5 (Thinking)',
  'claude-sonnet-4-5': 'Claude Sonnet 4.5',
  'claude-sonnet-4-5-thinking': 'Claude Sonnet 4.5 (Thinking)',
  'gemini-3-flash': 'Gemini 3 Flash',
  'gemini-3-pro-high': 'Gemini 3 Pro (High)',
  'gemini-3-pro-low': 'Gemini 3 Pro (Low)',
  'gemini-3-pro-image': 'Gemini 3 Pro Image',
  'gpt-oss-120b-medium': 'GPT-OSS 120B (Medium)',
  // Gemini 2.5 系列
  'gemini-2.5-flash': 'Gemini 2.5 Flash',
  'gemini-2.5-flash-lite': 'Gemini 2.5 Flash Lite',
  'gemini-2.5-flash-thinking': 'Gemini 2.5 Flash (Thinking)',
  'gemini-2.5-pro': 'Gemini 2.5 Pro',
  
  // 插件端格式（大写）
  'MODEL_PLACEHOLDER_M12': 'Claude Opus 4.5 (Thinking)',
  'MODEL_CLAUDE_4_5_SONNET': 'Claude Sonnet 4.5',
  'MODEL_CLAUDE_4_5_SONNET_THINKING': 'Claude Sonnet 4.5 (Thinking)',
  'MODEL_PLACEHOLDER_M18': 'Gemini 3 Flash',
  'MODEL_PLACEHOLDER_M7': 'Gemini 3 Pro (High)',
  'MODEL_PLACEHOLDER_M8': 'Gemini 3 Pro (Low)',
  'MODEL_PLACEHOLDER_M9': 'Gemini 3 Pro Image',
  'MODEL_OPENAI_GPT_OSS_120B_MEDIUM': 'GPT-OSS 120B (Medium)',
};

/**
 * 获取模型的友好显示名称
 * @param modelId 模型 ID
 * @returns 友好的显示名称
 */
export function getModelDisplayName(modelId: string): string {
  if (MODEL_DISPLAY_NAMES[modelId]) {
    return MODEL_DISPLAY_NAMES[modelId];
  }
  
  // 格式化未知模型名
  return modelId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** 默认分组配置 */
export interface DefaultGroup {
  id: string;
  name: string;
  desktopModels: string[];  // 桌面端模型 ID
  pluginModels: string[];   // 插件端模型 ID
}

/** 获取默认分组配置（支持两种格式） */
export function getDefaultGroups(): DefaultGroup[] {
  return [
    {
      id: 'claude_45',
      name: 'Claude 4.5',
      desktopModels: [
        'claude-opus-4-5-thinking',
        'claude-sonnet-4-5',
        'claude-sonnet-4-5-thinking',
        'gpt-oss-120b-medium',
      ],
      pluginModels: [
        'MODEL_PLACEHOLDER_M12',
        'MODEL_CLAUDE_4_5_SONNET',
        'MODEL_CLAUDE_4_5_SONNET_THINKING',
        'MODEL_OPENAI_GPT_OSS_120B_MEDIUM',
      ],
    },
    {
      id: 'g3_pro',
      name: 'G3-Pro',
      desktopModels: [
        'gemini-3-pro-high',
        'gemini-3-pro-low',
      ],
      pluginModels: [
        'MODEL_PLACEHOLDER_M7',
        'MODEL_PLACEHOLDER_M8',
      ],
    },
    {
      id: 'g3_flash',
      name: 'G3-Flash',
      desktopModels: [
        'gemini-3-flash',
      ],
      pluginModels: [
        'MODEL_PLACEHOLDER_M18',
      ],
    },
    {
      id: 'g3_image',
      name: 'G3-Image',
      desktopModels: [
        'gemini-3-pro-image',
      ],
      pluginModels: [
        'MODEL_PLACEHOLDER_M9',
      ],
    },
  ];
}

/**
 * 自动分组模型（支持两种格式）
 * @param modelIds 模型 ID 列表
 * @returns 分组结果
 */
export function autoGroupModels(modelIds: string[]): { id: string; name: string; models: string[] }[] {
  const defaultGroups = getDefaultGroups();
  const result: { id: string; name: string; models: string[] }[] = [];
  const matchedModels = new Set<string>();
  
  for (const group of defaultGroups) {
    const groupModels: string[] = [];
    
    for (const modelId of modelIds) {
      // 检查是否匹配桌面端或插件端格式
      const isDesktopMatch = group.desktopModels.includes(modelId);
      const isPluginMatch = group.pluginModels.includes(modelId);
      
      if (isDesktopMatch || isPluginMatch) {
        groupModels.push(modelId);
        matchedModels.add(modelId);
      }
    }
    
    if (groupModels.length > 0) {
      result.push({
        id: group.id,
        name: group.name,
        models: groupModels,
      });
    }
  }
  
  // 不生成"其他"分组，只保留预定义分组
  
  return result;
}

/** 推荐模型列表（支持两种格式） */
export const RECOMMENDED_MODELS = [
  // 桌面端格式
  'claude-opus-4-5-thinking',
  'claude-sonnet-4-5',
  'claude-sonnet-4-5-thinking',
  'gemini-3-flash',
  'gemini-3-pro-high',
  'gemini-3-pro-low',
  'gemini-3-pro-image',
  'gpt-oss-120b-medium',
  // 插件端格式
  'MODEL_PLACEHOLDER_M12',
  'MODEL_CLAUDE_4_5_SONNET',
  'MODEL_CLAUDE_4_5_SONNET_THINKING',
  'MODEL_PLACEHOLDER_M18',
  'MODEL_PLACEHOLDER_M7',
  'MODEL_PLACEHOLDER_M8',
  'MODEL_PLACEHOLDER_M9',
  'MODEL_OPENAI_GPT_OSS_120B_MEDIUM',
];

/**
 * 检查模型是否为推荐模型
 */
export function isRecommendedModel(modelId: string): boolean {
  return RECOMMENDED_MODELS.includes(modelId);
}

/**
 * 过滤只保留推荐模型
 */
export function filterRecommendedModels(modelIds: string[]): string[] {
  return modelIds.filter(id => isRecommendedModel(id));
}
