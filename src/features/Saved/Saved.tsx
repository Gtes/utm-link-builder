import { getRouteApi } from '@tanstack/react-router';

import LinkItem from '@/components/LinkItem/LinkItem';
import { useCopyToClipboard } from '@/hooks/useCopiedUrl';
import { useUTMLinks } from '@/hooks/useUTMLinks';

const routeApi = getRouteApi('/saved');

const Saved = () => {
  const navigate = routeApi.useNavigate();

  const { links, deleteLink } = useUTMLinks();
  const { copiedValue, copy } = useCopyToClipboard();

  const handleEdit = (url: string) => {
    navigate({
      to: '/builder',
      search: { url },
    });
  };

  const handleDelete = (url: string) => {
    deleteLink(url);
  };

  return links.length === 0 ? (
    <div className="flex justify-center">
      <span className="font-light">No saved Links</span>
    </div>
  ) : (
    <div className={`flex flex-col justify-between gap-2`}>
      {links.map((link) => (
        <LinkItem
          url={link.id}
          onCopy={copy}
          onEdit={handleEdit}
          onDelete={handleDelete}
          copiedUrl={copiedValue}
        />
      ))}{' '}
    </div>
  );
};

export default Saved;
