import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { TaskRounded, CheckCircleRounded, NotificationsRounded, SyncAltRounded } from '@mui/icons-material';

import { SitemarkIcon } from '../SignIn/CustomIcons';

const items = [
  {
    icon: <TaskRounded sx={{ color: 'text.secondary' }} />,
    title: 'Create your account',
    description:
      'Sign up easily to create your personal task management account and start organizing your tasks right away.',
  },
  {
    icon: <CheckCircleRounded sx={{ color: 'text.secondary' }} />,
    title: 'Set up your profile',
    description:
      'Quickly set up your profile with essential details and start tracking your tasks and goals efficiently.',
  },
  {
    icon: <NotificationsRounded sx={{ color: 'text.secondary' }} />,
    title: 'Get instant reminders',
    description:
      'After signing up, receive timely notifications for your tasks and stay on track with your productivity goals.',
  },
  {
    icon: <SyncAltRounded sx={{ color: 'text.secondary' }} />,
    title: 'Sync and access anywhere',
    description:
      'Once registered, sync your tasks across devices and access them anytime, anywhere with seamless synchronization.',
  },
];



export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SitemarkIcon />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
