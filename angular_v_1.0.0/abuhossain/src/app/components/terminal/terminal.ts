import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerminalService } from '../../services/TerminalService';

interface CommandOutput {
  command: string;
  type: 'about' | 'skills' | 'projects' | 'contact' | 'help' | 'error' | 'clear' | 'text';
  data?: any;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.html',
  styleUrl: './terminal.css'
})
export class TerminalComponent implements OnInit {
  private terminalService = inject(TerminalService);

  @ViewChild('cmdInput') cmdInput!: ElementRef<HTMLInputElement>;

  terminalData: any = {};
  inputCommand: string = '';
  history: CommandOutput[] = [];

  ngOnInit(): void {
    this.terminalService.getTerminalData().subscribe({
      next: (data: any) => {
        this.terminalData = data;
      },
      error: (err: any) => console.error('Error loading terminal data:', err)
    });
  }

  focusInput(): void {
    if (this.cmdInput) {
      this.cmdInput.nativeElement.focus();
    }
  }

  runCommand(cmdString: string): void {
    this.inputCommand = cmdString;
    this.handleCommand();
  }

  handleCommand(): void {
    const rawCmd = this.inputCommand.trim();
    const cmd = rawCmd.toLowerCase();
    if (!rawCmd) return;

    if (cmd === 'clear') {
      this.history = [];
      this.inputCommand = '';
      return;
    }

    let output: CommandOutput = { command: rawCmd, type: 'error' };

    switch (cmd) {
      case 'help':
        output = { command: rawCmd, type: 'help' };
        break;
      case 'about':
      case 'cat about.txt':
        output = { command: rawCmd, type: 'about', data: this.terminalData.about };
        break;
      case 'skills':
      case 'ls skills':
        output = { command: rawCmd, type: 'skills', data: this.terminalData.skills };
        break;
      case 'projects':
      case 'ls projects':
        output = { command: rawCmd, type: 'projects', data: this.terminalData.projects };
        break;
      case 'contact':
        output = { command: rawCmd, type: 'contact', data: this.terminalData.contact };
        break;

      /* First Batch of Linux Commands */
      case 'whoami':
        output = { command: rawCmd, type: 'text', data: 'abuhossain (Java Backend Developer & Software Engineer)' };
        break;
      case 'pwd':
        output = { command: rawCmd, type: 'text', data: '/home/abuhossain/portfolio' };
        break;
      case 'hostname':
        output = { command: rawCmd, type: 'text', data: 'ab-linux-box' };
        break;
      case 'date':
        output = { command: rawCmd, type: 'text', data: new Date().toString() };
        break;

      default:
        output = { command: rawCmd, type: 'error', data: `Command not found: ${rawCmd}. Type 'help' for available commands.` };
    }

    this.history.push(output);
    this.inputCommand = '';
    
    setTimeout(() => {
      this.focusInput();
    }, 0);
  }
}