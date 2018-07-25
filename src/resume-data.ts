export class Resume {
    header: Header;
    sections: Section[];
    footer: Footer[];
  }

export class Header {
    title: string;
    subtitle: string;
    contactInfo: string[];
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
    items: string;
}

export class SaveFile {
    constructor(_name, _resume) {
        this.name = _name;
        this.resume = _resume;
    }

    name: string;
    resume: Resume;
}
