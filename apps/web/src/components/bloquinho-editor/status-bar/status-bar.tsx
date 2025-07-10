'use client';

import { BugIcon, LanguagesIcon, SlidersVerticalIcon } from 'lucide-react';

import { AppVersion } from 'src/components/bloquinho-editor/status-bar/app-version';
import { ExtensionsSelect } from 'src/components/bloquinho-editor/status-bar/extensions-select';
import { StatusIndicator } from 'src/components/bloquinho-editor/status-bar/status-indicator';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from 'src/components/drop-down-menu';
import { FeedbackForm } from 'src/components/feedback/feedback-form';
import { Button } from 'src/components/form/button';
import { NewBadgeIcon } from 'src/components/icons/new-badge-icon';
import { useBloquinhoEditorContext } from 'src/components/providers/bloquinho-editor-provider';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'src/components/tooltip';
import { useI18n } from 'src/providers/i18n-provider';
import { cn } from 'src/utils/classes';
import { getAvailableLanguages } from 'src/utils/i18n';
import type { Lang } from 'src/utils/i18n/dictionary';

export function StatusBar() {
	return (
		<footer className="border-t border-t-zinc-200 py-2 px-(--monaco-scrollbar-width) shrink-0 flex gap-8 items-center justify-between">
			<div className="h-full flex items-center justify-start gap-4">
				<AppVersion />
				<Separator />
				<FeedbackForm trigger={<FeedbackButton />} />
			</div>
			<div className="shrink-0 ml-auto flex flex-wrap items-center justify-start gap-4 h-full">
				<LanguageDropdown />
				<Separator />
				<PreferencesDropdown />
				<Separator />
				<ExtensionsSelect />
				<Separator />
				<StatusIndicator />
			</div>
		</footer>
	);
}

function Separator() {
	return <div className={cn('w-px bg-zinc-200 h-[50%]')} />;
}

function FeedbackButton() {
	const { t } = useI18n();

	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<FeedbackForm.Trigger>
					<TooltipTrigger asChild>
						<Button variant="secondary">
							<BugIcon className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
				</FeedbackForm.Trigger>
				<TooltipContent side="top" align="start">
					<span>{t('ReportBugOrSuggestion')}</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

function LanguageDropdown() {
	const { language, changeLanguage, t } = useI18n();

	return (
		<DropdownMenu>
			<div className="relative">
				<NewBadgeIcon />
				<DropdownMenuTrigger asChild>
					<Button variant="secondary">
						<LanguagesIcon className="w-4 h-4" />
					</Button>
				</DropdownMenuTrigger>
			</div>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>{t('Language')}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={language}
					onValueChange={value => changeLanguage(value as Lang)}
				>
					{getAvailableLanguages().map(lang => (
						<DropdownMenuRadioItem key={lang.code} value={lang.code}>
							{lang.name}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function PreferencesDropdown() {
	const { t } = useI18n();
	const { lineWrap, enableLineWrap, disableLineWrap }
		= useBloquinhoEditorContext();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">
					<SlidersVerticalIcon className="w-4 h-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>{t('Preferences')}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuCheckboxItem
						checked={lineWrap}
						onCheckedChange={lineWrap ? disableLineWrap : enableLineWrap}
					>
						{t('LineWrap')}
					</DropdownMenuCheckboxItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
