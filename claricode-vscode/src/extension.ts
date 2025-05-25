import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('claricode.helloWorld', () => {
    vscode.window.showInformationMessage('Claricode VS Code Extension Activated!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
