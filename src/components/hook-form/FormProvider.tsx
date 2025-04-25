import { FormProvider as Form, UseFormReturn, FieldValues } from 'react-hook-form';
const FormProvider = <T extends FieldValues> ({children, onSubmit, methods}:{
    children: React.ReactNode,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    methods: UseFormReturn<T>
}) => {
  return (
    <Form {...methods}>
        <form  onSubmit={onSubmit}>
            {children}
        </form>
    </Form>
  )
}

export default FormProvider

