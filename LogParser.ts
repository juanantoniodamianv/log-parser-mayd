import * as fs from 'fs';

interface IErrorLog {
    transactionId: string;
    details: string;
    code: number;
    err: string;
}

export enum LogLevel {
    error = 'error',
    warn = 'warn',
    info = 'info',
    debug = 'debug',
}

export class LogParser {

    public inputFile: string;
    public outputFile: string;
    public errorLogs: IErrorLog[] = [];

    constructor(inputFile: string, outputFile: string) {
        this.inputFile = inputFile;
        this.outputFile = outputFile;
    }
    
    private getFileFromPath(): string | void {
        try {
            return fs.readFileSync(this.inputFile, 'utf8');   
        } catch (error) {
            console.log(`Error: ${error}\nTry to run the program aga4in`);
        }
    }

    private getLogLevel(log: string): string {
        return log.split(' - ')[1];
    }

    private getObjectLog(log: string): IErrorLog {
        return JSON.parse(log.split(' - ')[2]);
    }

    private upsertIntoJSONFile(): void {
        this.existFile() ? fs.writeFileSync(this.outputFile, JSON.stringify(this.errorLogs)) : fs.appendFileSync(this.outputFile, JSON.stringify(this.errorLogs));
    }

    private existFile(): boolean {
        return fs.existsSync(this.outputFile); 
    }

    private getContentFile(): IErrorLog[] {
        if (this.existFile()) {
            const outputFile = fs.readFileSync(this.outputFile, 'utf8')
            return outputFile ? JSON.parse(outputFile) : []; 
        } 
        return [];
    }

    init() {
        const inputFile = this.getFileFromPath();
        if (inputFile) {            
            inputFile.split('\n').forEach(log => {
                const logLevel = this.getLogLevel(log);
                if (logLevel === LogLevel.error) {
                    const message: IErrorLog = this.getObjectLog(log);
                    this.errorLogs.push(message);
                }
            });
            const contentFile = this.getContentFile();
            this.errorLogs = [...contentFile, ...this.errorLogs];
            this.upsertIntoJSONFile();
        }            
    }
}
