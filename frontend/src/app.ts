import {ObjectSyncClient, SObject, StringTopic, DictTopic, IntTopic, SetTopic, FloatTopic, GenericTopic} from 'objectsync-client'

import { Node } from './sobjects/node'
import { Editor } from './ui_utils/editor'
import { Root } from './sobjects/root'
import { expose } from './devUtils'
import { Port } from './sobjects/port'
import { Edge } from './sobjects/edge'
import { TextOutputNode } from './sobjects/nodes/textOutputNode'
import { TextInputNode } from './sobjects/nodes/textInputNode'
import { SoundManager } from './ui_utils/soundManager';
import { Sidebar } from './sobjects/sideBar'

export const editor = new Editor();

export const soundManager = new SoundManager();

//const objectsync = new ObjectSyncClient('ws://192.168.245.187:8765');
const objectsync = new ObjectSyncClient('ws://localhost:8765');
objectsync.register(Root);
objectsync.register(Node);
objectsync.register(TextInputNode);
objectsync.register(TextOutputNode);
objectsync.register(Port);
objectsync.register(Edge);
objectsync.register(Sidebar);


document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        objectsync.undo(null);
    }
    if (event.ctrlKey && event.key === 'y') {
        event.preventDefault();
        objectsync.redo(null);
    }
});

expose('c',objectsync)