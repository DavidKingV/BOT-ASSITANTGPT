import { createFlow } from '@builderbot/bot';
import { welcomeFlow } from './welcome.flow';
import { blackListFlow } from './blacklist.flow';
import { appointmentFlow } from './appointment.flow';
import { reappointmentFlow } from './reappointment.flow';
import { cancelappointmentFlow } from './cancelappointment.flow';
import { agentFlow } from './agent.flow';

export const flow = createFlow([welcomeFlow, blackListFlow, appointmentFlow, reappointmentFlow, cancelappointmentFlow, agentFlow]);