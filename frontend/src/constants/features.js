import {
  ChartPieIcon,
  BellIcon,
  CurrencyDollarIcon,
  TagIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline'
export const features = [
  {
    icon: <ChartPieIcon className='h-8 w-8' />,
    title: 'Transaction Tracking',
    description:
      'Monitor all your financial movements across multiple accounts in one place'
  },
  {
    icon: <DocumentChartBarIcon className='h-8 w-8' />,
    title: 'Custom Reports',
    description: 'Generate detailed financial reports for any time period'
  },
  {
    icon: <BellIcon className='h-8 w-8' />,
    title: 'Budget Alerts',
    description:
      'Get instant notifications when you approach or exceed your budget limits'
  },
  {
    icon: <TagIcon className='h-8 w-8' />,
    title: 'Smart Categories',
    description: 'Organize expenses with custom categories and subcategories'
  },
  {
    icon: <CurrencyDollarIcon className='h-8 w-8' />,
    title: 'Financial Analytics',
    description: 'Visualize your spending patterns with interactive charts'
  }
]
