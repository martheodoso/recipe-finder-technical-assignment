import Tag from "../Tag/Tag";
import { v4 as uuidv4 } from 'uuid';

type TagsPanelProps = {
	tags: string[];
}

const TagsPanel = ({ tags }: TagsPanelProps) => {
	return tags ? (
		<div className="flex space-x-2 overflow-x-auto py-2">
			{tags.map((tag) => (
				<Tag key={uuidv4()} title={tag} />
			))}
		</div>
	) : null;
}

export default TagsPanel;