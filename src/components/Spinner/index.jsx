function Spinner(props) {

    let isLoading = props.isLoading;
    let className = props.className;

    if (isLoading) {
        return <span className={className} role="status" aria-hidden="true"></span>
    } 

    return null
}

export default Spinner;