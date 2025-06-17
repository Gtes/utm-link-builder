import { Check, Copy, Edit, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type LinkItemProps = {
  url: string;
  onCopy: (url: string) => void;
  onEdit: (url: string) => void;
  onDelete: (url: string) => void;
  copiedUrl: string | null;
};

const LinkItem = ({
  url,
  onCopy,
  onEdit,
  onDelete,
  copiedUrl,
}: LinkItemProps) => {
  return (
    <Card className="w-[100%] p-[0]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="overflow-x-auto">
            <div className="whitespace-nowrap">{url}</div>
          </div>

          <div className="flex flex-shrink-0 items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(url)}>
              <Edit />
              <span className="sr-only">Edit URL</span>
            </Button>

            <Button variant="ghost" size="icon" onClick={() => onCopy(url)}>
              {copiedUrl === url ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(url)}
            >
              <Trash2 />
              <span className="sr-only">Delete URL</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkItem;
