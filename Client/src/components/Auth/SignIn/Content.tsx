import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { TaskRounded, CheckCircleRounded, NotificationsRounded, SyncAltRounded } from '@mui/icons-material';

import { SitemarkIcon } from './CustomIcons';

const items = [
  {
    icon: <TaskRounded sx={{ color: 'text.secondary' }} />,
    title: 'Organize your tasks',
    description:
      'Efficiently manage your to-dos with clear task categorization and prioritization for better productivity.',
  },
  {
    icon: <CheckCircleRounded sx={{ color: 'text.secondary' }} />,
    title: 'Track your progress',
    description:
      'Stay on top of your goals by checking off completed tasks and visualizing your accomplishments.',
  },
  {
    icon: <NotificationsRounded sx={{ color: 'text.secondary' }} />,
    title: 'Stay reminded',
    description:
      'Never miss a deadline with timely notifications and reminders to keep you focused on what matters.',
  },
  {
    icon: <SyncAltRounded sx={{ color: 'text.secondary' }} />,
    title: 'Sync across devices',
    description:
      'Access your tasks anytime, anywhere, with seamless synchronization across all your devices.',
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
