// @flow
import * as React from 'react';
import { ListItem } from 'material-ui/List';
import ListIcon from '../../../UI/ListIcon';
import { type InstructionOrExpressionTreeNode } from '../InstructionOrExpressionSelector/CreateTree';
import { type EnumeratedInstructionOrExpressionMetadata } from '../InstructionOrExpressionSelector/EnumeratedInstructionOrExpressionMetadata.js';
import Subheader from 'material-ui/Subheader';
import flatten from 'lodash/flatten';
import { getSubheaderListItemKey, getInstructionListItemKey } from './Keys';

type Props = {|
  instructionTreeNode: InstructionOrExpressionTreeNode,
  onChoose: (type: string, EnumeratedInstructionOrExpressionMetadata) => void,
  iconSize: number,
  useSubheaders?: boolean,
|};

const styles = {
  groupListItemNestedList: {
    padding: 0,
  },
};

export const renderInstructionTree = ({
  instructionTreeNode,
  onChoose,
  iconSize,
  useSubheaders,
}: Props): Array<ListItem> => {
  return flatten(
    Object.keys(instructionTreeNode).map(key => {
      // In theory, we should have a way to distinguish
      // between instruction (leaf nodes) and group (nodes). We use
      // the "type" properties, but this will fail if a group is called "type"
      // (hence the flow errors, which are valid warnings)
      const instructionOrGroup = instructionTreeNode[key];
      if (!instructionOrGroup) return null;

      if (typeof instructionOrGroup.type === 'string') {
        // $FlowFixMe - see above
        const instructionInformation: EnumeratedInstructionOrExpressionMetadata = instructionOrGroup;
        const value = getInstructionListItemKey(instructionOrGroup.type);
        return (
          <ListItem
            key={value}
            primaryText={key}
            value={value}
            leftIcon={
              <ListIcon
                iconSize={iconSize}
                src={instructionInformation.iconFilename}
              />
            }
            onClick={() => {
              onChoose(instructionInformation.type, instructionInformation);
            }}
          />
        );
      } else {
        // $FlowFixMe - see above
        const groupOfInstructionInformation: InstructionOrExpressionTreeNode = instructionOrGroup;
        if (useSubheaders) {
          return [
            <Subheader key={getSubheaderListItemKey(key)}>{key}</Subheader>,
          ].concat(
            renderInstructionTree({
              instructionTreeNode: groupOfInstructionInformation,
              onChoose,
              iconSize,
              useSubheaders: false,
            })
          );
        } else {
          return (
            <ListItem
              key={key}
              nestedListStyle={styles.groupListItemNestedList}
              primaryText={key}
              primaryTogglesNestedList={true}
              autoGenerateNestedIndicator={true}
              nestedItems={renderInstructionTree({
                instructionTreeNode: groupOfInstructionInformation,
                onChoose,
                iconSize,
              })}
            />
          );
        }
      }
    })
  );
};
