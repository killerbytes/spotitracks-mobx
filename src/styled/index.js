import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
body {
    background:  ${props => props.theme.darkBg};
    color: #bbb;
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
    color: ${props => props.theme.lightBg};

}
a{
    color: ${props => props.theme.lightBg}
}
main{
    /* background:  ${props => props.theme.darkBg}; */

}
.container{
    max-width: 976px;
    margin: auto;
    padding-left: 1rem;
    padding-right: 1rem;
}

form{
    .form-group{
        label{
            display: block;
            margin-bottom: .2rem;
        }
    }
    .form-control{
        width: 100%;
        padding: .5rem;
    }
}
.btn{
    outline: none;
    font-size: 11px;
    background-color: ${props => props.theme.darkBg2};
    width: auto;
    display: inline-block;
    border: none;
    color: ${props => props.theme.lightBg};
    text-transform: uppercase;
    text-decoration: none;
    padding: .5rem 1rem;
    border-radius: 50px;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    cursor: pointer;
    &:disabled{
        opacity: .5;
    }
    &:hover{
        /* box-shadow: inset 0 0 0 1px #b3b3b3; */
        background-color: ${props => props.theme.darkBg};
    }
    &.btn-clear{
        padding: 0;
        background: none;
        box-shadow: none;
    }
    &.btn-default {
        background-color: ${props => props.theme.darkBg};
        
    }
    &.btn-primary{
        background-color: ${props => props.theme.primary};
        &:hover{
            box-shadow: none;
            background-color: #1ed760;
        }
    }
    &.btn-fab{
        background-color: ${props => props.theme.primary};
        position: absolute;
        top: -2rem;
        right: 1rem;
        width: 45px;
        height: 45px;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
    }
    &.btn-outline{
        border: 1px solid ${props => props.theme.lightBg2};
    }
}

@media (min-width: 576px) { 
    .btn+.btn,
    .btn+.btn-toggle,
    .btn-toggle+.btn-toggle{
        margin-left: .5rem;
    }
}


.btn-toggle{
        input{
            display: none;
        }
        .btn-bg{
            background-color: ${props => props.theme.darkBg2};

        }
        input:checked+.btn-bg{
            background: ${props => props.theme.primary};
        }
    }



`
