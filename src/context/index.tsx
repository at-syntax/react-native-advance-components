import React from 'react';
import type { ColorSchemeName } from 'react-native';

export type Theme = {
  mode: ColorSchemeName;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
};

const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};

const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
};

const myTheme: Record<NonNullable<Theme['mode']>, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

export const RNAdvanceComponentContext = React.createContext<Theme>(lightTheme);

type RNAdvanceComponentProviderProps =
  typeof RNAdvanceComponentProvider.defaultProps &
    React.PropsWithChildren<{
      mode: Theme['mode'];
    }>;

interface RNAdvanceComponentStateTypes {
  theme: Theme;
}

export class RNAdvanceComponentProvider extends React.Component<
  RNAdvanceComponentProviderProps,
  RNAdvanceComponentStateTypes
> {
  constructor(props: RNAdvanceComponentProviderProps) {
    super(props);
    this.state = {
      theme: lightTheme,
    };
  }

  static defaultProps = {
    mode: 'light',
  };

  componentDidMount() {
    this.setState({ theme: myTheme[this.props.mode] });
  }

  componentDidUpdate(
    prevProps: Readonly<RNAdvanceComponentProviderProps>
  ): void {
    if (prevProps.mode !== this.props.mode) {
      this.setState({ theme: myTheme[this.props.mode] });
    }
  }

  render() {
    return (
      <RNAdvanceComponentContext.Provider value={this.state.theme}>
        {this.props.children}
      </RNAdvanceComponentContext.Provider>
    );
  }
}
