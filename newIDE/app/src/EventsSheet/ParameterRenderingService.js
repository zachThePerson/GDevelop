// @flow
import * as React from 'react';
import {
  type ParameterInlineRenderer,
  type ParameterInlineRendererProps,
} from './ParameterFields/ParameterInlineRenderer.flow';
import DefaultField from './ParameterFields/DefaultField';
import RelationalOperatorField, {
  renderInlineRelationalOperator,
} from './ParameterFields/RelationalOperatorField';
import OperatorField from './ParameterFields/OperatorField';
import MouseField, { renderInlineMouse } from './ParameterFields/MouseField';
import KeyField, { renderInlineKey } from './ParameterFields/KeyField';
import ObjectField, {
  renderInlineObjectWithThumbnail,
} from './ParameterFields/ObjectField';
import YesNoField, { renderInlineYesNo } from './ParameterFields/YesNoField';
import TrueFalseField, {
  renderInlineTrueFalse,
} from './ParameterFields/TrueFalseField';
import ExpressionField from './ParameterFields/ExpressionField';
import StringField from './ParameterFields/StringField';
import StringWithSelectorField from './ParameterFields/StringWithSelectorField';
import BehaviorField from './ParameterFields/BehaviorField';
import SceneVariableField, {
  renderInlineSceneVariable,
} from './ParameterFields/SceneVariableField';
import GlobalVariableField, {
  renderInlineGlobalVariable,
} from './ParameterFields/GlobalVariableField';
import ObjectVariableField, {
  renderInlineObjectVariable,
} from './ParameterFields/ObjectVariableField';
import LayerField from './ParameterFields/LayerField';
import AudioResourceField from './ParameterFields/AudioResourceField';
import VideoResourceField from './ParameterFields/VideoResourceField';
import JsonResourceField from './ParameterFields/JsonResourceField';
import ColorExpressionField from './ParameterFields/ColorExpressionField';
import ForceMultiplierField, {
  renderInlineForceMultiplier,
} from './ParameterFields/ForceMultiplierField';
import SceneNameField from './ParameterFields/SceneNameField';
const gd = global.gd;

const components = {
  default: DefaultField,
  mouse: MouseField,
  object: ObjectField,
  relationalOperator: RelationalOperatorField,
  operator: OperatorField,
  yesorno: YesNoField,
  trueorfalse: TrueFalseField,
  expression: ExpressionField,
  string: StringField,
  stringWithSelector: StringWithSelectorField,
  behavior: BehaviorField,
  scenevar: SceneVariableField,
  globalvar: GlobalVariableField,
  objectvar: ObjectVariableField,
  layer: LayerField,
  key: KeyField,
  file: DefaultField, //TODO
  musicfile: AudioResourceField,
  soundfile: AudioResourceField,
  videoResource: VideoResourceField,
  jsonResource: JsonResourceField,
  color: ColorExpressionField,
  police: DefaultField, //TODO
  joyaxis: DefaultField, //TODO
  forceMultiplier: ForceMultiplierField,
  sceneName: SceneNameField,
};
const inlineRenderers: { [string]: ParameterInlineRenderer } = {
  forceMultiplier: renderInlineForceMultiplier,
  globalvar: renderInlineGlobalVariable,
  scenevar: renderInlineSceneVariable,
  objectvar: renderInlineObjectVariable,
  key: renderInlineKey,
  mouse: renderInlineMouse,
  object: renderInlineObjectWithThumbnail,
  yesorno: renderInlineYesNo,
  trueorfalse: renderInlineTrueFalse,
  relationalOperator: renderInlineRelationalOperator,
};

export default {
  components,
  getParameterComponent: (type: string) => {
    const fieldType = gd.ParameterMetadata.isObject(type) ? 'object' : type;

    if (components.hasOwnProperty(fieldType)) return components[fieldType];
    else return components.default;
  },
  renderInlineParameter: (props: ParameterInlineRendererProps): React.Node => {
    const rawType = props.parameterMetadata.getType();
    const fieldType = gd.ParameterMetadata.isObject(rawType)
      ? 'object'
      : rawType;

    return inlineRenderers[fieldType]
      ? inlineRenderers[fieldType](props)
      : props.value;
  },
};
