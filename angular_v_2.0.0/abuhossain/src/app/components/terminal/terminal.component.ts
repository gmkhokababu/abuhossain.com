import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioData } from '../../models/portfolio.model';

interface CommandOutput {
  type: 'command' | 'output' | 'error' | 'info';
  line: string | string[];
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent implements OnInit, AfterViewChecked {
  @ViewChild('outputContainer') private outputContainer!: ElementRef;
  @ViewChild('inputField') private inputField!: ElementRef;

  currentInput = '';
  outputHistory: CommandOutput[] = [];
  portfolioData: PortfolioData | null = null;
  currentDirectory = '~';
  commandHistory: string[] = [];
  historyIndex = -1;
  matrixChars: Array<{ left: number; top: number; char: string }> = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe((data) => {
      this.portfolioData = data;
      this.displayWelcome();
      this.generateMatrix();
    });
  }

  ngAfterViewChecked(): void {
    if (this.outputContainer) {
      this.outputContainer.nativeElement.scrollTop =
        this.outputContainer.nativeElement.scrollHeight;
    }
  }

  private generateMatrix(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.matrixChars = Array.from({ length: 40 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * -100,
      char: chars[Math.floor(Math.random() * chars.length)]
    }));
  }

  private displayWelcome(): void {
    this.outputHistory = [
      {
        type: 'info',
        line: [
          'Welcome to portfolio.sh',
          "Type 'help' to see commands.",
          'Use the terminal commands to browse the portfolio.'
        ]
      }
    ];
  }

  private getHelpText(): string {
    return [
      'Available commands:',
      '  help       - Show available commands',
      '  about      - Show your short bio',
      '  skills     - Show your technical skills',
      '  projects   - Show your project list',
      '  experience - Show professional experience',
      '  contact    - Show your contact info',
      '  ls         - List portfolio sections',
      '  cat        - Open a file or section',
      '  pwd        - Show current directory',
      '  clear      - Clear the terminal',
      '',
      'Tip: Try "about", "skills", "projects", or "contact".'
    ].join('\n');
  }

  private getAboutText(): string {
    if (!this.portfolioData) {
      return 'No portfolio data loaded.';
    }

    const data = this.portfolioData;
    return [
      '=== About ===',
      '',
      data.profile.name,
      data.profile.title,
      '',
      data.about.summary,
      '',
      `Location: ${data.profile.location}`,
      '',
      '=== Education ===',
      ...data.about.education.map(
        (edu) =>
          `${edu.degree} - ${edu.school} (${edu.year})`
      )
    ].join('\n');
  }

  private getSkillsText(): string {
    if (!this.portfolioData) {
      return 'No portfolio data loaded.';
    }

    const data = this.portfolioData;
    return [
      '=== Skills ===',
      '',
      `Languages: ${data.skills.languages.join(', ')}`,
      `Frontend: ${data.skills.frontend.join(', ')}`,
      `Backend: ${data.skills.backend.join(', ')}`,
      `Tools: ${data.skills.tools.join(', ')}`,
      ''
    ].join('\n');
  }

  private getProjectsText(): string {
    if (!this.portfolioData) {
      return 'No portfolio data loaded.';
    }

    return [
      '=== Projects ===',
      '',
      ...this.portfolioData.projects.map((project, index) => {
        return [
          `${index + 1}. ${project.title}`,
          `   ${project.description}`,
          `   Tech: ${project.technologies.join(', ')}`,
          project.live ? `   Live: ${project.live}` : '',
          project.github ? `   GitHub: ${project.github}` : '',
          ''
        ].join('\n');
      })
    ].join('\n');
  }

  private getExperienceText(): string {
    if (!this.portfolioData) {
      return 'No portfolio data loaded.';
    }

    return [
      '=== Experience ===',
      '',
      ...this.portfolioData.about.experience.map((exp) => {
        return [
          `${exp.role} @ ${exp.company}`,
          `${exp.duration}`,
          exp.description,
          ''
        ].join('\n');
      })
    ].join('\n');
  }

  private getContactText(): string {
    if (!this.portfolioData) {
      return 'No portfolio data loaded.';
    }

    return [
      '=== Contact ===',
      '',
      `Email: ${this.portfolioData.contact.email}`,
      `GitHub: ${this.portfolioData.contact.github}`,
      `LinkedIn: ${this.portfolioData.contact.linkedin}`,
      this.portfolioData.contact.twitter
        ? `Twitter: ${this.portfolioData.contact.twitter}`
        : '',
      this.portfolioData.contact.phone
        ? `Phone: ${this.portfolioData.contact.phone}`
        : ''
    ].join('\n');
  }

  private getLsOutput(): string {
    return ['about', 'skills', 'projects', 'experience', 'contact', '.profile'].join(
      '\t'
    );
  }

  private getCatOutput(fileName: string): string {
    if (!this.portfolioData) {
      return 'No portfolio data loaded.';
    }

    switch (fileName.toLowerCase()) {
      case 'about':
        return this.getAboutText();
      case 'skills':
        return this.getSkillsText();
      case 'projects':
        return this.getProjectsText();
      case 'experience':
        return this.getExperienceText();
      case 'contact':
        return this.getContactText();
      case '.profile':
        return JSON.stringify(this.portfolioData.profile, null, 2);
      default:
        return `cat: ${fileName}: No such file or directory`;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const trimmed = this.currentInput.trim();

      if (!trimmed) {
        return;
      }

      this.commandHistory.push(trimmed);
      this.historyIndex = this.commandHistory.length;

      this.executeCommand(trimmed);
      this.currentInput = '';
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.currentInput = this.commandHistory[this.historyIndex];
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.currentInput = this.commandHistory[this.historyIndex];
      } else if (this.historyIndex === this.commandHistory.length) {
        this.historyIndex = this.commandHistory.length;
        this.currentInput = '';
      }
    }
  }

  private executeCommand(input: string): void {
    const command = input.trim().toLowerCase();
    const commandParts = command.split(/\s+/);

    if (!commandParts[0]) {
      return;
    }

    this.outputHistory.push({
      type: 'command',
      line: `$ ${input}`
    });

    switch (commandParts[0]) {
      case 'help':
        this.outputHistory.push({
          type: 'info',
          line: this.getHelpText()
        });
        break;

      case 'about':
        this.outputHistory.push({
          type: 'output',
          line: this.getAboutText()
        });
        break;

      case 'skills':
        this.outputHistory.push({
          type: 'output',
          line: this.getSkillsText()
        });
        break;

      case 'projects':
        this.outputHistory.push({
          type: 'output',
          line: this.getProjectsText()
        });
        break;

      case 'experience':
        this.outputHistory.push({
          type: 'output',
          line: this.getExperienceText()
        });
        break;

      case 'contact':
        this.outputHistory.push({
          type: 'output',
          line: this.getContactText()
        });
        break;

      case 'ls':
        this.outputHistory.push({
          type: 'output',
          line: this.getLsOutput()
        });
        break;

      case 'cat':
        if (commandParts[1]) {
          this.outputHistory.push({
            type: 'output',
            line: this.getCatOutput(commandParts[1])
          });
        } else {
          this.outputHistory.push({
            type: 'error',
            line: 'cat: missing file operand'
          });
        }
        break;

      case 'pwd':
        this.outputHistory.push({
          type: 'output',
          line: this.currentDirectory
        });
        break;

      case 'clear':
        this.outputHistory = [];
        break;

      default:
        this.outputHistory.push({
          type: 'error',
          line: `command not found: ${commandParts[0]}`
        });
    }
  }

  focusInput(): void {
    this.inputField?.nativeElement?.focus();
  }


  isArray(value: any): boolean {
    return Array.isArray(value);
  }


  getLines(line: string | string[]): string[] {
    return Array.isArray(line) ? line : [line];
  }

}