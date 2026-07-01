import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

const lightRedTheme = {
  colors: {
    editor: {
      text: "#222222",
      background: "#ffeeee",
    },
    menu: {
      text: "#ffffff",
      background: "#9b0000",
    },
    tooltip: {
      text: "#ffffff",
      background: "#b00000",
    },
    hovered: {
      text: "#ffffff",
      background: "#b00000",
    },
    selected: {
      text: "#ffffff",
      background: "#c50000",
    },
    disabled: {
      text: "#9b0000",
      background: "#7d0000",
    },
    shadow: "#640000",
    border: "#870000",
    sideMenu: "#bababa",
    highlights: lightDefaultTheme.colors.highlights,
  },
  borderRadius: 4,
  fontFamily: "Helvetica Neue, sans-serif",
};

const darkRedTheme = {
  ...lightRedTheme,
  colors: {
    ...lightRedTheme.colors,
    editor: {
      text: "#ffffff",
      background: "#9b0000",
    },
    sideMenu: "#ffffff",
    highlights: darkDefaultTheme.colors.highlights,
  },
};

const redTheme = {
  light: lightRedTheme,
  dark: darkRedTheme,
};

export default function Editor() {
  const editor = useCreateBlockNote({});

  return <BlockNoteView editor={editor} /*theme={redTheme}*/ />;
}