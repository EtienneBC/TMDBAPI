import { createTheme } from "@nextui-org/react"


const theme = createTheme({
    type: "dark", // it could be "light" or "dark"
    theme: {
      colors: {
        // brand colors
        primaryLight: '#A5BCDD',
        primaryLightHover: '$green300',
        primaryLightActive: '$green400',
        primaryLightContrast: '$green600',
        primary: '#A5BCDD',
        primaryBorder: '$green500',
        primaryBorderHover: '$green600',
        primarySolidHover: '$green700',
        primarySolidContrast: '$white',
        primaryShadow: '$green500',
  
        gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
        link: '#A5BCDD',

        background:"#202020",
  
        // you can also create your own color
        bgBlue: '#051E3C',
        bgGrey: '#222222'
  
        // ...  more colors
      },
      space: {},
      fonts: {
        // you can also create your own font
        body: 'open-sans, sans-serif',
        heading:  'Jost, sans-serif',
            }
    }
  })

export default theme;