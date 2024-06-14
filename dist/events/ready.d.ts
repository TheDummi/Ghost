/** @format */
import { XernerxClientType, XernerxEvent } from 'xernerx';
export default class ReadyEvent extends XernerxEvent<'ready'> {
    constructor();
    run(client: XernerxClientType): Promise<void>;
    color(): string;
}
