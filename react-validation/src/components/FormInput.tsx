/* tslint:disable */
import React, {Component, SyntheticEvent} from 'react';
import composeValidation from '../validation/composeValidation';

interface IProps {
    label: { name: string, placeholder: string };
    placeholder: string,
    name: string
    value: string,
    validate: Array<Function>,
    onChange: Function,
    error?: string,
    fields: any,
    className?: any
}

class FormInput extends Component<IProps> {
    private validation: any = null;

    componentDidMount() {
        const {validate, name, value, onChange} = this.props;

        this.validation = composeValidation(validate);

        onChange({name, value, error: '', validate});
    }

    validate = (value: string | boolean) => {
        return this.validation(value);
    };

    handleChange = (e: SyntheticEvent) => {
        const {name, value, type, checked} = e.target as HTMLInputElement;
        const {validate} = this.props;

        const val = type === "checkbox" ? checked : value;

        const error = this.validate(val);
        const field = error
            ? {name, value: val, error: error, validate}
            : {name, value: val, error: '', validate};

        this.setState({error});
        return this.props.onChange(field);
    };

    render() {
        const {label, validate, error, fields, className, ...rest} = this.props;
        return (
            <div>
                {error && <div className="form-error">{error}</div>}
                <div className={className}>
                    <label htmlFor={label.name}>{label.placeholder}: </label>
                    <input {...rest} onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

export default FormInput;
