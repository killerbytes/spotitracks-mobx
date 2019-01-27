import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Oswald|Roboto');
body {
    background:  ${props => props.theme.bgColor};
    background-image: linear-gradient(to right bottom, #121212, #000), linear-gradient(#0000, #000 70%);
    color: #bbb;
    font-family: Roboto, sans-serif;
    font-size: 16px;
}
h1,h2,h3,h4{
    color: #FFF;
}
.container{
    max-width: 1100px;
    margin: auto;
    padding-left: 1rem;
    padding-right: 1rem;
}
.btn{
    outline: none;
    font-size: 11px;
    background-color: #181818b3;
    width: auto;
    display: inline-block;
    border: none;
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 50px;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    cursor: pointer;
    &:hover{
        box-shadow: inset 0 0 0 2px #b3b3b3;
        background-color: #333;
    }
    &.btn-primary{
        background-color: ${props => props.theme.colorGreen};
        &:hover{
            box-shadow: none;
            background-color: #1ed760;
        }
    }
}
.btn+.btn{
    margin-left: .5rem;
}


`
