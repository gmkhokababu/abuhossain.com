import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerminalService } from '../../services/terminal';

interface CommandOutput {
  command: string;
  type: 'welcome' | 'about' | 'skills' | 'projects' | 'contact' | 'help' | 'error' | 'clear';
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

  terminalData: any = {};
  inputCommand: string = '';
  history: CommandOutput[] = [];

  ngOnInit(): void {
    this.terminalService.getTerminalData().subscribe({
      next: (data: any) => {
        this.terminalData = data;
        if (data && data.welcome) {
          this.history.push({
            command: 'welcome',
            type: 'welcome',
            data: data.welcome
          });
        }
      },
      error: (err: any) => console.error('Error loading terminal data:', err)
    });
  }

  runCommand(cmdString: string): void {
    this.inputCommand = cmdString;
    this.handleCommand();
  }

  handleCommand(): void {
    const cmd = this.inputCommand.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      this.history = [];
      this.inputCommand = '';
      return;
    }

    let output: CommandOutput = { command: cmd, type: 'error' };

    switch (cmd) {
      case 'help':
        output = { command: cmd, type: 'help' };
        break;
      case 'about':
      case 'cat about.txt':
        output = { command: cmd, type: 'about', data: this.terminalData.about };
        break;
      case 'skills':
      case 'ls skills':
        output = { command: cmd, type: 'skills', data: this.terminalData.skills };
        break;
      case 'projects':
      case 'ls projects':
        output = { command: cmd, type: 'projects', data: this.terminalData.projects };
        break;
      case 'contact':
        output = { command: cmd, type: 'contact', data: this.terminalData.contact };
        break;
      default:
        output = { command: cmd, type: 'error', data: `Command not found: ${cmd}. Type 'help' for available commands.` };
    }

    this.history.push(output);
    this.inputCommand = '';
  }
}