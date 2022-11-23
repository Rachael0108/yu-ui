<!-- button.vue -->
<template>
  <button class="y-button" :class="styleClass">
    <Icon v-if="iconFont.iconName && iconFont.position != 'right'" :name="iconFont.iconName" />
    <span class="y-button-text" v-if="slots.default">
            <slot />
        </span>
    <Icon v-if="iconFont.position == 'right' && iconFont.iconName" :name="iconFont.iconName" />
  </button>
</template>

<script lang="ts">
import './style/index.less'
import { defineComponent, computed, useSlots } from 'vue'
import { buttonProps } from './type'
import Icon from '../icon/icon.vue'
export default defineComponent({
  name: 'y-button',
  props: buttonProps,
  components: { Icon },
  setup(props) {
    const styleClass = computed(() => {
      return {
        [`y-button--${props.type}`]: props.type,
        'is-plain': props.plain,
        'is-round': props.round,
        'is-disabled': props.disabled,
        [`y-button--${props.size}`]: props.size,
      }
    })

    //图标
    const iconFont = computed(() => {
      const iconName = props.icon
      const position = props.iconPosition
      return {
        iconName,
        position
      }
    })

    const slots = useSlots()
    return {
      styleClass,
      Icon,
      iconFont,
      slots
    };
  },
});
</script>
