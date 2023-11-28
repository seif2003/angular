export class Course {
    id: number;
    title: string;
    lesson: string;
    qcm: QCM;

    constructor(id: number, title: string, lesson: string, qcm: QCM) {
        this.id = id;
        this.title = title;
        this.lesson = lesson;
        this.qcm = qcm;
    }
}

export class QCM {
    question: string;
    options: QCMOption[];

    constructor(question: string, options: QCMOption[]) {
        this.question = question;
        this.options = options;
    }
}

export class QCMOption {
    answer: string;
    correct: boolean;

    constructor(answer: string, correct: boolean) {
        this.answer = answer;
        this.correct = correct;
    }
}
