import React, { FunctionComponent } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro'
import theme from './themes'
import { Theme } from './themes/types'
import IndexPage from './pages'

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
body {
  margin: 0;
  background-color: ${(props) => props.theme.primary.backgroundColor};
  color: ${(props) => props.theme.primary.color};
}
`

// const StyledApp = styled.div`
//   color: blue;
// `

const App: FunctionComponent = () => (
  <ThemeProvider theme={theme}>
    <IndexPage />
    {/* <StyledApp>hi</StyledApp> */}
    <GlobalStyle />
  </ThemeProvider>
)

export default App
