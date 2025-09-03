import {type ExtractPublicPropTypes, type PropType } from "vue";

export const messagePropsOptions = {
  content: {
    type: String,
    default: ""
  },
  duration: {
    type: Number,
    default: 3000
  },
  onClose: {
    type: Function as PropType<(el: HTMLDivElement) => void>,
  },
} as const


export type MessageProps = ExtractPublicPropTypes<typeof messagePropsOptions>;



