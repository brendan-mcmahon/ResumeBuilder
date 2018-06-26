export class Resume {
    header: Header;
    sections: Section[];
    footer: Footer;
  }

export class Header {
    title: string;
    subtitle: string;
    sidebar: string[];
}

export class Section {
    title: string;
    subsections: Subsection[];
}

export class Subsection {
    title: string;
    subtitle: string;
    items: string[];
    sidebar: string;
}

export class Footer {
    items: string[];
}
