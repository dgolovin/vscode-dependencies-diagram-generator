import { Uri, window, commands, ProgressLocation, Progress, CancellationToken } from "vscode";
import * as madge from 'madge';
import path = require('path');

export function generateDiagram(folder: Uri) {
    window.withProgress({
        cancellable: false,
        location: ProgressLocation.Notification,
        title: 'Creating diagram image'
    },
    async (progress: Progress<{increment: number, message: string}>, token: CancellationToken) => {
        progress.report({increment: 50, message: 'Creating dependencies tree'});
        return madge(folder.fsPath, {
            fileExtensions: 'ts'
        }).then(async (res:any) => {
            progress.report({increment: 25, message: 'Writing diagram image'}); 
            return res.image(path.join(folder.fsPath, 'dependencies.png'));
        }).then(async (writtenImagePath) => {
            progress.report({increment: 25, message: 'Opening diagram image in editor'}); 
            return commands.executeCommand('vscode.open', Uri.file(writtenImagePath));
        });
    });
}