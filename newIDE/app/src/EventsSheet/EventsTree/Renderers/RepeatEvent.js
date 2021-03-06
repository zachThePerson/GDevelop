// @flow
import * as React from 'react';
import InstructionsList from '../InstructionsList.js';
import classNames from 'classnames';
import {
  largeSelectedArea,
  largeSelectableArea,
  selectableArea,
  executableEventContainer,
  disabledText,
} from '../ClassNames';
import InlinePopover from '../../InlinePopover';
import DefaultField from '../../ParameterFields/DefaultField';
import { type EventRendererProps } from './EventRenderer.flow';
const gd = global.gd;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  instructionsContainer: {
    display: 'flex',
  },
  actionsList: {
    flex: 1,
  },
};

export default class RepeatEvent extends React.Component<
  EventRendererProps,
  *
> {
  state = {
    editing: false,
    anchorEl: null,
  };

  edit = (domEvent: any) => {
    this.setState({
      editing: true,
      anchorEl: domEvent.currentTarget,
    });
  };

  endEditing = () => {
    this.setState({
      editing: false,
      anchorEl: null,
    });
  };

  render() {
    var repeatEvent = gd.asRepeatEvent(this.props.event);

    const conditionsListSyle = {
      width: `calc(35vw - ${this.props.leftIndentWidth}px)`,
    };

    const expression = repeatEvent.getRepeatExpression();
    return (
      <div
        style={styles.container}
        className={classNames({
          [largeSelectableArea]: true,
          [largeSelectedArea]: this.props.selected,
          [executableEventContainer]: true,
        })}
      >
        <div>
          <span
            className={classNames({
              [selectableArea]: true,
              [disabledText]: this.props.disabled,
            })}
            onClick={this.edit}
          >
            {expression ? (
              `Repeat ${expression} times:`
            ) : (
              <i>Click to choose how many times will be repeated</i>
            )}
          </span>
        </div>
        <div style={styles.instructionsContainer}>
          <InstructionsList
            instrsList={repeatEvent.getConditions()}
            style={conditionsListSyle}
            selection={this.props.selection}
            areConditions
            onAddNewInstruction={this.props.onAddNewInstruction}
            onPasteInstructions={this.props.onPasteInstructions}
            onMoveToInstruction={this.props.onMoveToInstruction}
            onMoveToInstructionsList={this.props.onMoveToInstructionsList}
            onInstructionClick={this.props.onInstructionClick}
            onInstructionDoubleClick={this.props.onInstructionDoubleClick}
            onInstructionContextMenu={this.props.onInstructionContextMenu}
            onInstructionsListContextMenu={
              this.props.onInstructionsListContextMenu
            }
            onParameterClick={this.props.onParameterClick}
            disabled={this.props.disabled}
            renderObjectThumbnail={this.props.renderObjectThumbnail}
          />
          <InstructionsList
            instrsList={repeatEvent.getActions()}
            style={
              {
                ...styles.actionsList,
              } /* TODO: Use a new object to force update - somehow updates are not always propagated otherwise */
            }
            selection={this.props.selection}
            areConditions={false}
            onAddNewInstruction={this.props.onAddNewInstruction}
            onPasteInstructions={this.props.onPasteInstructions}
            onMoveToInstruction={this.props.onMoveToInstruction}
            onMoveToInstructionsList={this.props.onMoveToInstructionsList}
            onInstructionClick={this.props.onInstructionClick}
            onInstructionDoubleClick={this.props.onInstructionDoubleClick}
            onInstructionContextMenu={this.props.onInstructionContextMenu}
            onInstructionsListContextMenu={
              this.props.onInstructionsListContextMenu
            }
            onParameterClick={this.props.onParameterClick}
            disabled={this.props.disabled}
            renderObjectThumbnail={this.props.renderObjectThumbnail}
          />
        </div>
        <InlinePopover
          open={this.state.editing}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.endEditing}
        >
          <DefaultField
            project={this.props.project}
            scope={this.props.scope}
            globalObjectsContainer={this.props.globalObjectsContainer}
            objectsContainer={this.props.objectsContainer}
            value={expression}
            onChange={text => {
              repeatEvent.setRepeatExpression(text);
              this.props.onUpdate();
            }}
            isInline
          />
        </InlinePopover>
      </div>
    );
  }
}
