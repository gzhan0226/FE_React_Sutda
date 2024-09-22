function Button({children, onClick,disabled,className}) {
    return(
        <button className={className} disabled={disabled} onClick={onClick}>{children}</button>
    );
};

export default Button;