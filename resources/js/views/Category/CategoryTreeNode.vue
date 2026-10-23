<template>
    <div class="category-tree-node" :class="{ 'is-root': depth === 0, 'has-children': hasChildren }">
        <div class="tree-node-row" :style="rowIndentStyle">
            <!-- Connector branch guide for nested nodes -->
            <div v-if="depth > 0" class="tree-branch-guide" aria-hidden="true"></div>

            <!-- Expand / collapse toggle -->
            <button
                v-if="hasChildren"
                type="button"
                class="tree-toggle-btn"
                :class="{ 'is-open': isExpanded }"
                @click.stop="$emit('toggle', node.id)"
                :aria-label="isExpanded ? __('collapse') || 'Collapse' : __('expand') || 'Expand'"
                v-b-tooltip.hover
                :title="isExpanded ? __('collapse') || 'Collapse' : __('expand') || 'Expand'">
                <svg v-if="isExpanded" class="tree-toggle-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                <svg v-else class="tree-toggle-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
            <span v-else class="tree-leaf-placeholder" aria-hidden="true">
                <span class="tree-leaf-dot"></span>
            </span>

            <!-- Category Thumbnail -->
            <div class="tree-node-thumb flex-shrink-0">
                <img :src="node.image_url || $placeholderImage" :alt="node.name" @error="onImgError" />
            </div>

            <!-- Category Info & Relationship Path -->
            <div class="tree-node-info flex-grow-1 min-w-0">
                <div class="d-flex align-items-center flex-wrap gap-2">
                    <span class="tree-node-name" :class="{ 'tree-root-name': depth === 0 }">
                        {{ node.name }}
                    </span>
                    <span class="tree-badge-id">#{{ node.id }}</span>

                    <!-- Hierarchy / Level tag -->
                    <span v-if="depth === 0" class="badge tree-depth-badge root-badge">
                        <i class="bi bi-layers-fill me-1"></i>{{ __('root_category') || 'Parent' }}
                    </span>
                    <span v-else class="badge tree-depth-badge child-badge">
                        <i class="bi bi-arrow-return-right me-1"></i>{{ depth === 1 ? (__('sub_category') || 'Subcategory') : ((__('level') || 'Level') + ' ' + (depth + 1)) }}
                    </span>

                    <!-- Subcategories count tag -->
                    <span v-if="hasChildren" class="badge tree-children-badge" :title="(node.children.length) + ' ' + (__('sub_categories') || 'subcategories')">
                        <i class="bi bi-diagram-2 me-1"></i>{{ node.children.length }}
                    </span>
                </div>

                <!-- Breadcrumb Hierarchy Relation: parent > child > child's child -->
                <div v-if="depth > 0 && node.path && node.path.length" class="tree-relation-path mt-1">
                    <i class="bi bi-diagram-3 me-1 tree-path-icon" aria-hidden="true"></i>
                    <span v-for="(seg, idx) in node.path" :key="idx" class="tree-path-item">
                        <span class="tree-path-segment" :class="{ 'is-current': idx === node.path.length - 1 }">{{ seg }}</span>
                        <i v-if="idx < node.path.length - 1" class="bi bi-chevron-right tree-path-sep" aria-hidden="true"></i>
                    </span>
                </div>
                <div v-else-if="node.subtitle" class="tree-node-subtitle text-muted mt-1">
                    {{ node.subtitle }}
                </div>
            </div>

            <!-- Status Pill -->
            <div class="tree-node-status flex-shrink-0">
                <span class="badge bg-success" v-if="node.status == 1">{{ __('active') }}</span>
                <span class="badge bg-danger" v-else>{{ __('deactive') }}</span>
            </div>

            <!-- Action buttons -->
            <div class="tree-node-actions flex-shrink-0 d-flex align-items-center gap-1">
                <button
                    type="button"
                    class="figma-action-btn tree-action-add"
                    v-if="canCreate"
                    @click.stop="$emit('add-child', node)"
                    v-b-tooltip.hover
                    :title="__('add_sub_category') || 'Add Subcategory'">
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                        <path d="M18 9C18 9.19891 17.921 9.38968 17.7803 9.53033C17.6397 9.67098 17.4489 9.75 17.25 9.75H9.75V17.25C9.75 17.4489 9.67098 17.6397 9.53033 17.7803C9.38968 17.921 9.19891 18 9 18C8.80109 18 8.61032 17.921 8.46967 17.7803C8.32902 17.6397 8.25 17.4489 8.25 17.25V9.75H0.75C0.551088 9.75 0.360322 9.67098 0.21967 9.53033C0.0790178 9.38968 0 9.19891 0 9C0 8.80109 0.0790178 8.61032 0.21967 8.46967C0.360322 8.32902 0.551088 8.25 0.75 8.25H8.25V0.75C8.25 0.551088 8.32902 0.360322 8.46967 0.21967C8.61032 0.0790178 8.80109 0 9 0C9.19891 0 9.38968 0.0790178 9.53033 0.21967C9.67098 0.360322 9.75 0.551088 9.75 0.75V8.25H17.25C17.4489 8.25 17.6397 8.32902 17.7803 8.46967C17.921 8.61032 18 8.80109 18 9Z"/>
                    </svg>
                </button>
                <button
                    type="button"
                    class="figma-action-btn"
                    v-if="canUpdate"
                    @click.stop="$emit('edit', node)"
                    v-b-tooltip.hover
                    :title="__('edit')">
                    <base-icon name="edit icon" hoverName="edit Hover" width="20" height="20" />
                </button>
                <button
                    type="button"
                    class="figma-action-btn"
                    v-if="canDelete"
                    @click.stop="$emit('delete', node)"
                    v-b-tooltip.hover
                    :title="__('delete')">
                    <base-icon name="Type=Default" hoverName="Type=Hover" width="20" height="20" />
                </button>
            </div>
        </div>

        <!-- Collapsible nested children branch -->
        <b-collapse :visible="isExpanded && hasChildren" class="tree-children-collapse">
            <div class="tree-children-list" :class="'depth-container-' + depth">
                <category-tree-node
                    v-for="child in node.children"
                    :key="child.id"
                    :node="child"
                    :expanded-ids="expandedIds"
                    :depth="depth + 1"
                    :can-create="canCreate"
                    :can-update="canUpdate"
                    :can-delete="canDelete"
                    @toggle="$emit('toggle', $event)"
                    @edit="$emit('edit', $event)"
                    @delete="$emit('delete', $event)"
                    @add-child="$emit('add-child', $event)"
                />
            </div>
        </b-collapse>
    </div>
</template>

<script>
export default {
    name: 'CategoryTreeNode',
    props: {
        node: {
            type: Object,
            required: true
        },
        expandedIds: {
            type: Object,
            default: () => ({})
        },
        depth: {
            type: Number,
            default: 0
        },
        canCreate: {
            type: Boolean,
            default: false
        },
        canUpdate: {
            type: Boolean,
            default: false
        },
        canDelete: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        hasChildren() {
            return Array.isArray(this.node.children) && this.node.children.length > 0;
        },
        isExpanded() {
            return Boolean(this.expandedIds[this.node.id]);
        },
        rowIndentStyle() {
            // Apply indentation based on depth
            const indent = this.depth * 28;
            return {
                paddingLeft: `${Math.max(12, indent + 12)}px`
            };
        }
    },
    methods: {
        onImgError(e) {
            if (this.$placeholderImage && e.target.src !== this.$placeholderImage) {
                e.target.src = this.$placeholderImage;
            }
        }
    }
};
</script>

<style scoped>
.category-tree-node {
    position: relative;
    border-bottom: 1px solid var(--ui-border);
    transition: background-color 0.15s ease;
}

.category-tree-node:last-child {
    border-bottom: 0;
}

.category-tree-node.is-root {
    background: var(--ui-surface);
}

.category-tree-node.is-root:not(:first-child) {
    border-top: 1px solid var(--ui-border);
    margin-top: 2px;
}

.tree-node-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 16px;
    position: relative;
    min-height: 56px;
    transition: background-color 0.15s ease;
}

.tree-node-row:hover {
    background: var(--ui-surface-muted, rgba(0, 0, 0, 0.02));
}

/* Branch connector guide lines for child nodes */
.tree-branch-guide {
    position: absolute;
    left: 20px;
    top: -10px;
    bottom: 50%;
    width: 14px;
    border-left: 1.5px dashed var(--ui-border-strong);
    border-bottom: 1.5px dashed var(--ui-border-strong);
    border-bottom-left-radius: 4px;
    pointer-events: none;
}

/* Toggle expand/collapse button */
.tree-toggle-btn {
    width: 26px;
    height: 26px;
    min-width: 26px;
    min-height: 26px;
    box-sizing: border-box;
    border-radius: var(--ui-radius-sm, 6px);
    border: 1px solid var(--ui-border-strong);
    background: var(--ui-surface);
    color: var(--ui-text);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    margin: 0;
    line-height: 0;
    transition: all 0.15s ease;
    flex-shrink: 0;
    appearance: none;
    -webkit-appearance: none;
}

.tree-toggle-btn:hover {
    background: var(--ui-primary-soft);
    color: var(--theme-primary-600);
    border-color: var(--theme-primary-500);
}

.tree-toggle-btn.is-open {
    background: var(--ui-primary-soft);
    color: var(--theme-primary-600);
    border-color: var(--theme-primary-500);
}

.tree-toggle-svg {
    width: 12px;
    height: 12px;
    display: block;
    margin: auto;
    flex-shrink: 0;
    pointer-events: none;
}

.tree-leaf-placeholder {
    width: 26px;
    height: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.tree-leaf-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ui-border-strong);
}

/* Thumbnail */
.tree-node-thumb {
    width: 38px;
    height: 38px;
    border-radius: var(--ui-radius-sm, 6px);
    background: var(--ui-surface-muted);
    border: 1px solid var(--ui-border);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.tree-node-thumb img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.tree-node-noimg {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Info & Hierarchy labels */
.tree-node-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--ui-text);
}

.tree-root-name {
    font-size: 14.5px;
    font-weight: 700;
    color: var(--ui-text-emphasis, var(--ui-text));
}

.tree-badge-id {
    font-size: 11px;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: var(--ui-radius-sm, 4px);
    background: var(--ui-surface-muted);
    color: var(--theme-neutral-700);
    border: 1px solid var(--ui-border);
}

.tree-depth-badge {
    font-size: 10.5px;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 999px;
}

.tree-depth-badge.root-badge {
    background: var(--ui-primary-soft);
    color: var(--theme-primary-700);
}

.tree-depth-badge.child-badge {
    background: var(--ui-surface-muted);
    color: var(--theme-neutral-700);
    border: 1px solid var(--ui-border);
}

.tree-children-badge {
    font-size: 10.5px;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 999px;
    background: var(--ui-surface-muted);
    color: var(--theme-primary-700);
    border: 1px solid var(--ui-border);
}

/* Relationship Path (Parent > Child > Grandchild) */
.tree-relation-path {
    font-size: 12px;
    color: var(--theme-neutral-700);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 3px;
    line-height: 1.4;
}

.tree-path-icon {
    font-size: 11px;
    color: var(--theme-neutral-600);
}

.tree-path-item {
    display: inline-flex;
    align-items: center;
    gap: 3px;
}

.tree-path-segment {
    color: var(--theme-neutral-700);
}

.tree-path-segment.is-current {
    color: var(--ui-text);
    font-weight: 600;
}

.tree-path-sep {
    font-size: 9px;
    color: var(--ui-border-strong);
    opacity: 0.8;
}

.tree-node-subtitle {
    font-size: 12px;
    color: var(--theme-neutral-700);
    line-height: 1.3;
}

/* Tree actions styling & centering */
.tree-node-actions {
    display: flex;
    align-items: center;
    gap: 6px;
}

.tree-node-actions .figma-action-btn {
    width: 32px !important;
    height: 32px !important;
    padding: 0 !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-sizing: border-box !important;
    border-radius: var(--ui-radius, 8px) !important;
}

.tree-node-actions .figma-action-btn ::v-deep .base-icon {
    width: 20px !important;
    height: 20px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 !important;
    padding: 0 !important;
}

.tree-node-actions .figma-action-btn ::v-deep .base-icon svg {
    width: 20px !important;
    height: 20px !important;
    display: block !important;
    margin: auto !important;
}

.tree-action-add {
    color: var(--theme-primary-600) !important;
    border: 1px solid var(--ui-border) !important;
    background: var(--ui-surface) !important;
}

.tree-action-add:hover {
    background: var(--ui-primary-soft) !important;
    border-color: var(--theme-primary-500) !important;
    color: var(--theme-primary-700) !important;
}

.tree-action-add svg {
    width: 14px;
    height: 14px;
    display: block;
    margin: auto;
    flex-shrink: 0;
}

/* Nested container */
.tree-children-collapse {
    position: relative;
}

.tree-children-list {
    position: relative;
}

@media (max-width: 575.98px) {
    .tree-node-row {
        flex-wrap: wrap;
        padding-right: 12px;
        gap: 8px;
    }

    .tree-node-info {
        min-width: 100%;
        order: 3;
        padding-left: 38px;
    }

    .tree-node-status {
        order: 2;
    }

    .tree-node-actions {
        order: 2;
        margin-left: auto;
    }
}
</style>
