import { createFlow } from '@builderbot/bot';
import { welcomeFlow } from './welcome.flow';
import { blackListFlow } from './blacklist.flow';
import { appointmentFlow } from './appointment.flow';
import { reappointmentFlow } from './reappointment.flow';
import { cancelappointmentFlow } from './cancelappointment.flow';
import { agentFlow } from './agent.flow';
import { questionFlow } from './test.flow';
import { mediaFlow, documentFlow } from './media.flow';
import { idleFlow } from '../src/utils/idle-custom';
import { flowVoiceNote } from './voicenote.flow';

export const flow = createFlow([welcomeFlow, blackListFlow, appointmentFlow, reappointmentFlow, cancelappointmentFlow, agentFlow, questionFlow, mediaFlow, documentFlow,idleFlow,flowVoiceNote]);