import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Form, Label } from 'semantic-ui-react'
import { DateTimePicker } from "react-widgets";

interface IProps extends FieldRenderProps<Date, HTMLInputElement>, FormFieldProps { }

export const DateInput : React.FC<IProps> = ({
    input, width , placeholder,
    meta: { touched, error } 
}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            {/* <DateTimePicker/> */}
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    )
}
