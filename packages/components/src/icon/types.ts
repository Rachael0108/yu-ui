import {ExtractPropTypes} from "vue";
export const iconProps = {
    name: {
        type: String
    },
    dot: {
        type: String
    },
    badge: {
        type: String
    },
    color: {
        type: String
    }
}
export type IconProps = ExtractPropTypes<typeof iconProps>
