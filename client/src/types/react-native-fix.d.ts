import * as React from 'react';
import 'react-native';

declare module 'react-native' {
  interface ViewProps {
    children?: React.ReactNode;
  }
  interface TextProps {
    children?: React.ReactNode;
  }
}

declare global {
    namespace JSX {
        interface Element extends React.JSX.Element {}
        interface ElementClass extends React.JSX.ElementClass {}
        interface ElementAttributesProperty extends React.JSX.ElementAttributesProperty {}
        interface ElementChildrenAttribute extends React.JSX.ElementChildrenAttribute {}
        interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
        interface IntrinsicElements extends React.JSX.IntrinsicElements {}
    }
}
