import React, {Component} from 'react';
import set from 'lodash/set';
import axios from 'axios';

import './App.css';
import {Field, USER_INFO} from './constants/forms';
import FormInput from './components/FormInput';
import Form from './components/Form';
import {phoneNumber, required, email} from './validation/rules';

interface IState {
    fields: any,
    errors: any,
    formFilled: boolean,
    formValid: boolean,
    loading: boolean,
}

class App extends Component<any, IState> {
    state: IState = {
        fields: {
            firstName: {label: '', value: '', validate: [required()]},
            lastName: {label: '', value: '', validate: [required()]},
            address: {label: '', value: '', validate: [required()]},
            phone: {label: '', value: '', validate: [required(), phoneNumber()]},
            email: {label: '', value: '', validate: [required(), email()]},
            checkbox: {label: '', value: '', validate: [required()], type: "checkbox"},
        },
        errors: {},
        formFilled: false,
        formValid: true,
        loading: false
    };

    handleChange = ({name, value, error}: any) => {
        const nextState = set(this.state, `fields.${name}.value`, value);
        const nextStateWithErrors = set(nextState, `errors.${name}`, error);
        this.setState(nextStateWithErrors);
        this.checkFormValid();
    };

    handleBlur = () => {
        this.checkFormValid();
    };

    checkFormValid = () => {
        const {fields, errors} = this.state;
        const blankFields = Object.keys(fields).filter(key => !fields[key].value);
        const errorFields = Object.keys(errors).filter(key => errors[key]);
        this.setState({formFilled: !blankFields.length, formValid: !errorFields.length})
    };

    handleSubmit = (validated: any) => {
        if (validated.hasErrors) {
            const errors = validated.fields.reduce((acc: object, field: any) => {
                return {
                    ...acc,
                    [field.name]: field.error
                };
            }, {});
            return this.setState((prevState) => ({...prevState, errors}))
        }

        this.setState({loading: true});
        axios.post(`${process.env.REACT_APP_BASE_API_URL}/submit`, validated.values)
            .then(() => this.setState({loading: false}));
    };

    renderFields = (formProps: any) => {
        const {fields, errors} = this.state;
        return Object.keys(this.state.fields).map((key) => {
            const field: Field = USER_INFO[key];
            return <FormInput
                {...formProps}
                className="form-row"
                key={field.name}
                label={field}
                placeholder={field.placeholder}
                type={fields[field.name].type || "input"}
                name={field.name}
                value={fields[field.name].value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                validate={fields[field.name].validate}
                error={errors[field.name]}
            />;
        });
    };

    render() {
        return (
            <div className="form-wrapper">
                <Form className="form" fields={this.state.fields} onSubmit={this.handleSubmit} onSubmitValidate={true}>
                    {({onSubmit, ...formProps}: any) =>
                        <React.Fragment>
                            {this.renderFields(formProps)}
                            <div className="form-row">
                                <button disabled={!this.state.formFilled || !this.state.formValid} onClick={onSubmit}>
                                    {this.state.loading ? "Loading" : "Submit"}
                                </button>
                            </div>
                        </React.Fragment>
                    }
                </Form>
            </div>
        );
    };
}

export default App;
