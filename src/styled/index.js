import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
body {
    background:  ${(props) => props.theme.background};
    color: ${(props) => props.theme.foreground};
    font-family: Roboto, sans-serif;
    font-size: 16px;
    height: 100vh;
    user-select: none;
}


*, *::before, *::after {
    box-sizing: border-box;
}
h1,h2,h3,h4{
    font-weight: 500;
}
.container{
    max-width: 976px;
    margin: auto;
    padding-left: ${(props) => props.theme.spacing.md};
    padding-right: ${(props) => props.theme.spacing.md};
}

form{
    .form-group{
        display: flex;
        flex-direction: column;
        gap: ${(props) => props.theme.spacing.xs};
    }
    .form-control{
        width: 100%;
        padding: ${(props) => props.theme.spacing.sm};
    }
}


@media (min-width: 576px) { 
    .btn+.btn,
    .btn+.btn-toggle,
    .btn-toggle+.btn-toggle{
        margin-left: ${(props) => props.theme.spacing.sm};
    }
}


.btn-toggle{
        input{
            display: none;
        }
        .btn-bg{
            background-color: ${(props) => props.theme.backgroundElevated};

        }
        input:checked+.btn-bg{
            background: ${(props) => props.theme.primary};
        }
    }



`;
