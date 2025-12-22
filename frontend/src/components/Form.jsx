function Form({ children, formProps }) {
    return (
        <form style={{ width: "100%", margin: "15px" }} {...formProps}>
            {children}
        </form>
    )
}

export default Form