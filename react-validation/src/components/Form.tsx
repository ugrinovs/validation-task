import React, { Component, SyntheticEvent } from 'react';
import isEmpty from 'lodash/isEmpty';

import composeValidation from '../validation/composeValidation';

interface IProps {
  fields: any,
  onSubmitValidate?: boolean,
  onSubmit: Function,
  children: Function,
  className?: any,
}

class Form extends Component<IProps> {
  state = {
    fields: {},
    onSubmit: () => {
    }
  };

  componentDidMount() {
    const { fields, onSubmitValidate } = this.props;

    if (onSubmitValidate && !fields) {
      console.error('You should provide fields to ValidationForm to be able to validate them onSubmit');
    }

    this.setState({
      fields,
      onSubmit: this.onSubmit,
    });
  }

  onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { fields, onSubmitValidate, onSubmit } = this.props;

    const values = Object.keys(fields).reduce((acc, key) => ({
      ...acc,
      [key]: fields[key].value
    }), {});

    if (onSubmitValidate) {
      const fieldsWithValidationKeys = Object.keys(fields).filter(key => fields[key].validate);

      const errorExists = fieldsWithValidationKeys.filter(this.hasErrors);
      if (!isEmpty(errorExists)) {
        const fieldsWithErrors = fieldsWithValidationKeys.map(this.getErrors);
        return onSubmit({ hasErrors: true, fields: fieldsWithErrors, values });
      }
    }

    return onSubmit({ hasErrors: false, fields, values });
  };

  hasErrors = (key: string) => {
    const { fields } = this.props;
    return composeValidation(fields[key].validate)(fields[key].value);
  };

  getErrors = (key: string) => {
    const { fields } = this.props;
    return {
      ...fields[key],
      name: key,
      error: composeValidation(fields[key].validate)(fields[key].value),
    };
  };

  renderFields = (children: Function) => {
    if (typeof children !== 'function') {
      console.error('Children should be provided as a function');
    }

    return children(this.state);
  };

  render() {
    return <React.Fragment>{this.renderFields(this.props.children)}</React.Fragment>;
  }
}

export default Form;
