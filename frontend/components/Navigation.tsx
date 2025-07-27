import Link from 'next/link';
import { Heart } from 'lucide-react';

// Add to your navigation component
<Link 
  href="/donate" 
  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
>
  <Heart className="h-4 w-4" />
  Donate
</Link>