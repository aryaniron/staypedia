'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tab =
  | 'general'
  | 'memos'
  | 'essentials'
  | 'recommendations'
  | 'host-info'
  | 'settings';

type GeneralSubTab = 'property' | 'location' | 'access' | 'rules' | 'greeting';

type HouseRule = {
  id: string;
  title: string;
  description?: string;
  icon: string;
};

type GuideStep = {
  id: string;
  text: string;
  image?: string;
  video?: string;
  voiceNote?: string;
};

type DescriptionBlock = {
  id: string;
  type: 'text' | 'image' | 'video' | 'voice';
  content: string;
};

type Memo = {
  id: string;
  title: string;
  coverImage?: string;
  descriptionBlocks: DescriptionBlock[];
};

type Callout = {
  id: string;
  title: string;
  description: DescriptionBlock[];
  icon: string;
  bgColor: string;
};

type Card = {
  id: string;
  title: string;
  icon: string;
  description: string;
};

type QuickWidget = {
  id: string;
  memoId: string;
  fullWidth: boolean;
};

export default function CreateGuidebookPage() {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [generalSubTab, setGeneralSubTab] = useState<GeneralSubTab>('property');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>(
    'mobile'
  );
  const [selfCheckinType, setSelfCheckinType] = useState<
    'lockbox' | 'door-code' | 'none'
  >('door-code');
  const [houseRules, setHouseRules] = useState<HouseRule[]>([
    { id: '1', title: 'No smoking', description: 'Smoking is not allowed inside the property', icon: '🚭' },
    { id: '2', title: 'No pets', description: 'Unfortunately, we cannot accommodate pets', icon: '🐾' },
  ]);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<HouseRule | null>(null);

  const [checkinSteps, setCheckinSteps] = useState<GuideStep[]>([
    { id: '1', text: 'Park in the designated guest parking area', image: undefined, video: undefined, voiceNote: undefined },
    { id: '2', text: 'Find the lockbox on the front door and enter code 1234', image: undefined, video: undefined, voiceNote: undefined },
    { id: '3', text: 'Enter the property and make yourself at home', image: undefined, video: undefined, voiceNote: undefined },
  ]);
  const [checkoutSteps, setCheckoutSteps] = useState<GuideStep[]>([
    { id: '1', text: 'Please strip all bedding and place in the laundry basket', image: undefined, video: undefined, voiceNote: undefined },
    { id: '2', text: 'Take out all trash to the bins outside', image: undefined, video: undefined, voiceNote: undefined },
    { id: '3', text: 'Lock all doors and windows before leaving', image: undefined, video: undefined, voiceNote: undefined },
  ]);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<GuideStep | null>(null);
  const [currentGuideType, setCurrentGuideType] = useState<'checkin' | 'checkout'>('checkin');

  const [memos, setMemos] = useState<Memo[]>([
    {
      id: '1',
      title: 'Coffee Machine Guide',
      coverImage: undefined,
      descriptionBlocks: [
        { id: '1', type: 'text', content: 'Our Nespresso machine is easy to use!' },
        { id: '2', type: 'text', content: '1. Fill the water tank\n2. Insert a capsule\n3. Press the lungo button' },
      ],
    },
    {
      id: '2',
      title: 'Parking Information',
      coverImage: undefined,
      descriptionBlocks: [
        { id: '1', type: 'text', content: 'Free parking is available in the driveway and on the street.' },
        { id: '2', type: 'text', content: 'Please do not park in front of the garage door.' },
      ],
    },
    {
      id: '3',
      title: 'Washer & Dryer',
      coverImage: undefined,
      descriptionBlocks: [
        { id: '1', type: 'text', content: 'The washer and dryer are located in the laundry room off the kitchen.' },
        { id: '2', type: 'text', content: 'Detergent and dryer sheets are provided under the sink.' },
      ],
    },
    {
      id: '4',
      title: 'Kitchen Essentials',
      coverImage: undefined,
      descriptionBlocks: [
        { id: '1', type: 'text', content: 'The kitchen is fully stocked with cookware, dishes, and utensils.' },
        { id: '2', type: 'text', content: 'Coffee, tea, sugar, salt, pepper, and olive oil are provided.' },
      ],
    },
  ]);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);

  // Essentials tab state
  const [callouts, setCallouts] = useState<Callout[]>([
    {
      id: '1',
      title: 'Emergency Contact',
      description: [
        { id: '1', type: 'text', content: 'In case of emergency, please call 911 immediately.' },
        { id: '2', type: 'text', content: 'For non-urgent issues, you can reach us at (555) 123-4567.' },
      ],
      icon: '🚨',
      bgColor: '#fee2e2',
    },
    {
      id: '2',
      title: 'Quiet Hours',
      description: [
        { id: '1', type: 'text', content: 'Please keep noise to a minimum between 10 PM and 8 AM.' },
        { id: '2', type: 'text', content: 'This helps ensure all guests have a peaceful stay.' },
      ],
      icon: '🤫',
      bgColor: '#e0e7ff',
    },
  ]);
  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      title: 'Heating & Cooling',
      icon: '🌡️',
      description: 'The thermostat is located in the living room. Please keep the temperature between 65-75°F to conserve energy.',
    },
    {
      id: '2',
      title: 'Garbage & Recycling',
      icon: '♻️',
      description: 'Trash day is every Tuesday. Please separate recyclables into the blue bin. Compost bin is under the kitchen sink.',
    },
    {
      id: '3',
      title: 'Internet & TV',
      icon: '📺',
      description: 'Smart TV has Netflix, Hulu, and Disney+. Use the remote to switch between apps. Streaming may require login.',
    },
  ]);
  const [quickWidgets, setQuickWidgets] = useState<QuickWidget[]>([
    { id: '1', memoId: '1', fullWidth: false },
    { id: '2', memoId: '2', fullWidth: true },
  ]);
  const [isCalloutModalOpen, setIsCalloutModalOpen] = useState(false);
  const [editingCallout, setEditingCallout] = useState<Callout | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState<QuickWidget | null>(null);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar - Navigation */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">
            Create Guidebook
          </h1>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-base transition-all ${
                activeTab === 'general'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>General</span>
            </button>

            <button
              onClick={() => setActiveTab('memos')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-base transition-all ${
                activeTab === 'memos'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Memos</span>
            </button>

            <button
              onClick={() => setActiveTab('essentials')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-base transition-all ${
                activeTab === 'essentials'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Essentials</span>
            </button>

            <button
              onClick={() => setActiveTab('recommendations')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-base transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Recommendations</span>
            </button>

            <button
              onClick={() => setActiveTab('host-info')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-base transition-all ${
                activeTab === 'host-info'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Host Info</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-base transition-all ${
                activeTab === 'settings'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <button className="w-full bg-primary text-primary-foreground py-2.5 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Save Draft
          </button>
          <button className="w-full border border-border bg-background text-foreground py-2.5 px-4 rounded-lg font-medium hover:bg-muted transition-colors">
            Publish
          </button>
        </div>
      </aside>

      {/* Middle - Editing Area */}
      <main className="w-[700px] overflow-y-auto flex-shrink-0">
        <div className="p-8 max-w-3xl mx-auto">
          {/* Tab Content Area */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {activeTab === 'general' && 'General Information'}
              {activeTab === 'memos' && 'Memos'}
              {activeTab === 'essentials' && 'Essentials'}
              {activeTab === 'recommendations' && 'Local Recommendations'}
              {activeTab === 'host-info' && 'Host Information'}
              {activeTab === 'settings' && 'Guidebook Settings'}
            </h2>
            <p className="text-muted-foreground">
              {activeTab === 'general' &&
                'Set up basic information about your property'}
              {activeTab === 'memos' &&
                'Create helpful guides and notes for your guests'}
              {activeTab === 'essentials' &&
                'WiFi, codes, and important house information'}
              {activeTab === 'recommendations' &&
                'Share your favorite local spots'}
              {activeTab === 'host-info' &&
                'Your contact details and hosting information'}
              {activeTab === 'settings' && 'Configure guidebook preferences'}
            </p>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'general' ? (
            <GeneralTabContent
              subTab={generalSubTab}
              setSubTab={setGeneralSubTab}
              selfCheckinType={selfCheckinType}
              setSelfCheckinType={setSelfCheckinType}
              houseRules={houseRules}
              setHouseRules={setHouseRules}
              isRuleModalOpen={isRuleModalOpen}
              setIsRuleModalOpen={setIsRuleModalOpen}
              editingRule={editingRule}
              setEditingRule={setEditingRule}
              checkinSteps={checkinSteps}
              setCheckinSteps={setCheckinSteps}
              checkoutSteps={checkoutSteps}
              setCheckoutSteps={setCheckoutSteps}
              isStepModalOpen={isStepModalOpen}
              setIsStepModalOpen={setIsStepModalOpen}
              editingStep={editingStep}
              setEditingStep={setEditingStep}
              currentGuideType={currentGuideType}
              setCurrentGuideType={setCurrentGuideType}
            />
          ) : activeTab === 'memos' ? (
            <MemosTabContent
              memos={memos}
              setMemos={setMemos}
              isMemoModalOpen={isMemoModalOpen}
              setIsMemoModalOpen={setIsMemoModalOpen}
              editingMemo={editingMemo}
              setEditingMemo={setEditingMemo}
            />
          ) : activeTab === 'essentials' ? (
            <EssentialsTabContent
              callouts={callouts}
              setCallouts={setCallouts}
              cards={cards}
              setCards={setCards}
              quickWidgets={quickWidgets}
              setQuickWidgets={setQuickWidgets}
              memos={memos}
              isCalloutModalOpen={isCalloutModalOpen}
              setIsCalloutModalOpen={setIsCalloutModalOpen}
              editingCallout={editingCallout}
              setEditingCallout={setEditingCallout}
              isCardModalOpen={isCardModalOpen}
              setIsCardModalOpen={setIsCardModalOpen}
              editingCard={editingCard}
              setEditingCard={setEditingCard}
              isWidgetModalOpen={isWidgetModalOpen}
              setIsWidgetModalOpen={setIsWidgetModalOpen}
              editingWidget={editingWidget}
              setEditingWidget={setEditingWidget}
            />
          ) : (
            <div className="bg-card border-2 border-dashed border-border rounded-2xl p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Coming soon
                </h3>
                <p className="text-sm text-muted-foreground">
                  Content for {activeTab.replace('-', ' ')} tab
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Right - Preview Section */}
      <aside className="flex-1 bg-muted/30 border-l border-border flex flex-col">
        {/* Preview Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Preview</h3>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  previewMode === 'desktop'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Desktop
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  previewMode === 'mobile'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Mobile
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Live preview of your guidebook
          </p>
        </div>

        {/* Preview Content - Mobile Frame */}
        <div className="flex-1 overflow-auto p-6 flex items-start justify-center">
          <div
            className={`bg-background border border-border shadow-xl transition-all ${
              previewMode === 'mobile'
                ? 'w-[360px] rounded-[2.5rem] p-3'
                : 'w-full rounded-xl'
            }`}
          >
            {previewMode === 'mobile' && (
              <>
                {/* Mobile Frame Notch */}
                <div className="bg-card rounded-[2rem] overflow-hidden border border-border">
                  <div className="h-6 bg-card flex items-center justify-center">
                    <div className="w-20 h-4 bg-background rounded-full"></div>
                  </div>

                  {/* Embedded Guidebook Preview - iframe */}
                  <div className="bg-background h-[600px] overflow-hidden">
                    <iframe
                      src="/guidebook/1"
                      className="w-full h-full border-0"
                      title="Guidebook Preview"
                    />
                  </div>

                  {/* Mobile Bottom Bar */}
                  <div className="h-1 bg-card"></div>
                </div>
              </>
            )}

            {previewMode === 'desktop' && (
              <div className="bg-background rounded-lg overflow-hidden border border-border">
                <div className="h-[600px] overflow-hidden">
                  <iframe
                    src="/guidebook/1"
                    className="w-full h-full border-0"
                    title="Guidebook Preview"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

// General Tab Content Component
function GeneralTabContent({
  subTab,
  setSubTab,
  selfCheckinType,
  setSelfCheckinType,
  houseRules,
  setHouseRules,
  isRuleModalOpen,
  setIsRuleModalOpen,
  editingRule,
  setEditingRule,
  checkinSteps,
  setCheckinSteps,
  checkoutSteps,
  setCheckoutSteps,
  isStepModalOpen,
  setIsStepModalOpen,
  editingStep,
  setEditingStep,
  currentGuideType,
  setCurrentGuideType,
}: {
  subTab: GeneralSubTab;
  setSubTab: (tab: GeneralSubTab) => void;
  selfCheckinType: 'lockbox' | 'door-code' | 'none';
  setSelfCheckinType: (type: 'lockbox' | 'door-code' | 'none') => void;
  houseRules: HouseRule[];
  setHouseRules: (rules: HouseRule[]) => void;
  isRuleModalOpen: boolean;
  setIsRuleModalOpen: (open: boolean) => void;
  editingRule: HouseRule | null;
  setEditingRule: (rule: HouseRule | null) => void;
  checkinSteps: GuideStep[];
  setCheckinSteps: (steps: GuideStep[]) => void;
  checkoutSteps: GuideStep[];
  setCheckoutSteps: (steps: GuideStep[]) => void;
  isStepModalOpen: boolean;
  setIsStepModalOpen: (open: boolean) => void;
  editingStep: GuideStep | null;
  setEditingStep: (step: GuideStep | null) => void;
  currentGuideType: 'checkin' | 'checkout';
  setCurrentGuideType: (type: 'checkin' | 'checkout') => void;
}) {
  const handleAddRule = () => {
    setEditingRule({
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: '📌',
    });
    setIsRuleModalOpen(true);
  };

  const handleEditRule = (rule: HouseRule) => {
    setEditingRule(rule);
    setIsRuleModalOpen(true);
  };

  const handleDeleteRule = (id: string) => {
    setHouseRules(houseRules.filter((rule) => rule.id !== id));
  };

  const handleSaveRule = () => {
    if (!editingRule) return;

    if (houseRules.find((r) => r.id === editingRule.id)) {
      // Update existing rule
      setHouseRules(
        houseRules.map((r) => (r.id === editingRule.id ? editingRule : r))
      );
    } else {
      // Add new rule
      setHouseRules([...houseRules, editingRule]);
    }

    setIsRuleModalOpen(false);
    setEditingRule(null);
  };

  const handleAddStep = (guideType: 'checkin' | 'checkout') => {
    setCurrentGuideType(guideType);
    setEditingStep({
      id: Date.now().toString(),
      text: '',
      image: undefined,
      video: undefined,
      voiceNote: undefined,
    });
    setIsStepModalOpen(true);
  };

  const handleEditStep = (step: GuideStep, guideType: 'checkin' | 'checkout') => {
    setCurrentGuideType(guideType);
    setEditingStep(step);
    setIsStepModalOpen(true);
  };

  const handleDeleteStep = (stepId: string, guideType: 'checkin' | 'checkout') => {
    const steps = guideType === 'checkin' ? checkinSteps : checkoutSteps;
    const setSteps = guideType === 'checkin' ? setCheckinSteps : setCheckoutSteps;
    setSteps(steps.filter((s) => s.id !== stepId));
  };

  const handleSaveStep = () => {
    if (!editingStep) return;

    const steps = currentGuideType === 'checkin' ? checkinSteps : checkoutSteps;
    const setSteps = currentGuideType === 'checkin' ? setCheckinSteps : setCheckoutSteps;

    if (steps.find((s) => s.id === editingStep.id)) {
      // Update existing step
      setSteps(steps.map((s) => (s.id === editingStep.id ? editingStep : s)));
    } else {
      // Add new step
      setSteps([...steps, editingStep]);
    }

    setIsStepModalOpen(false);
    setEditingStep(null);
  };

  const handleMoveStep = (stepId: string, direction: 'up' | 'down', guideType: 'checkin' | 'checkout') => {
    const steps = guideType === 'checkin' ? checkinSteps : checkoutSteps;
    const setSteps = guideType === 'checkin' ? setCheckinSteps : setCheckoutSteps;

    const index = steps.findIndex((s) => s.id === stepId);
    if (index === -1) return;

    const newSteps = [...steps];
    if (direction === 'up' && index > 0) {
      [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
    } else if (direction === 'down' && index < newSteps.length - 1) {
      [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
    }

    setSteps(newSteps);
  };
  return (
    <div>
      {/* Sub Navigation */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2 border-b border-border">
        <button
          onClick={() => setSubTab('property')}
          className={`pb-3 px-1 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
            subTab === 'property'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
          }`}
        >
          Property Info
        </button>
        <button
          onClick={() => setSubTab('location')}
          className={`pb-3 px-1 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
            subTab === 'location'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
          }`}
        >
          Location
        </button>
        <button
          onClick={() => setSubTab('access')}
          className={`pb-3 px-1 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
            subTab === 'access'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
          }`}
        >
          Access & WiFi
        </button>
        <button
          onClick={() => setSubTab('rules')}
          className={`pb-3 px-1 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
            subTab === 'rules'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
          }`}
        >
          Rules & Guides
        </button>
        <button
          onClick={() => setSubTab('greeting')}
          className={`pb-3 px-1 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
            subTab === 'greeting'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
          }`}
        >
          Starter Page
        </button>
      </div>

      {/* Property Info */}
      {subTab === 'property' && (
        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Property Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Cozy Mountain Cabin"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Cover Image
                </label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <svg
                    className="w-12 h-12 text-muted-foreground mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Click to upload cover image
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Welcome Note</h3>
            <textarea
              rows={4}
              placeholder="Write a warm welcome message for your guests..."
              className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">
              House Tour (Optional)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add a video, YouTube link, or image slideshow
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 px-4 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                  Upload Video
                </button>
                <button className="flex-1 py-2.5 px-4 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                  YouTube Link
                </button>
                <button className="flex-1 py-2.5 px-4 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                  Image Slideshow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location */}
      {subTab === 'location' && (
        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Short Address
                </label>
                <input
                  type="text"
                  placeholder="e.g., Eikeland 4993, Agder, Norway"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Address
                </label>
                <input
                  type="text"
                  placeholder="Complete address for directions"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <button className="w-full py-2.5 px-4 border border-primary text-primary rounded-xl text-sm font-medium hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Pick Location on Map
              </button>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Map Preview</h3>
            <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-muted-foreground mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <p className="text-sm text-muted-foreground">
                  Google/Apple Maps will appear here
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Access & WiFi */}
      {subTab === 'access' && (
        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">
              WiFi Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Network Name
                </label>
                <input
                  type="text"
                  placeholder="WiFi network name"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  type="text"
                  placeholder="WiFi password"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">
              Check-in & Check-out Times
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Check-in Time
                </label>
                <input
                  type="time"
                  defaultValue="15:00"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Check-out Time
                </label>
                <input
                  type="time"
                  defaultValue="11:00"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">
              Self Check-in Options
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setSelfCheckinType('lockbox')}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                    selfCheckinType === 'lockbox'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className="text-sm font-medium">Lockbox</div>
                </button>
                <button
                  onClick={() => setSelfCheckinType('door-code')}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                    selfCheckinType === 'door-code'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className="text-sm font-medium">Door Code</div>
                </button>
                <button
                  onClick={() => setSelfCheckinType('none')}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                    selfCheckinType === 'none'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className="text-sm font-medium">None</div>
                </button>
              </div>

              {selfCheckinType !== 'none' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {selfCheckinType === 'lockbox'
                      ? 'Lockbox Code'
                      : 'Door Code'}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rules & Guides */}
      {subTab === 'rules' && (
        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">House Rules</h3>
              <button
                onClick={handleAddRule}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Rule
              </button>
            </div>

            <div className="space-y-3">
              {houseRules.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No house rules yet. Click "Add Rule" to create one.</p>
                </div>
              ) : (
                houseRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-start gap-4 p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors group"
                  >
                    <div className="text-2xl flex-shrink-0">{rule.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground">{rule.title}</h4>
                      {rule.description && (
                        <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditRule(rule)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteRule(rule.id)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Check-in Guide */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Check-in Guide</h3>
              <button
                onClick={() => handleAddStep('checkin')}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Step
              </button>
            </div>

            <div className="space-y-3">
              {checkinSteps.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-xl">
                  <p className="text-sm">No steps yet. Click "Add Step" to create one.</p>
                </div>
              ) : (
                checkinSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className="flex items-start gap-3 p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors group"
                      >
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => handleMoveStep(step.id, 'up', 'checkin')}
                            disabled={index === 0}
                            className="p-1 hover:bg-background rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleMoveStep(step.id, 'down', 'checkin')}
                            disabled={index === checkinSteps.length - 1}
                            className="p-1 hover:bg-background rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{step.text}</p>
                          <div className="flex gap-2 mt-1">
                            {step.image && <span className="text-xs text-muted-foreground">📷 Image</span>}
                            {step.video && <span className="text-xs text-muted-foreground">🎥 Video</span>}
                            {step.voiceNote && <span className="text-xs text-muted-foreground">🎤 Voice</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditStep(step, 'checkin')}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteStep(step.id, 'checkin')}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                ))
              )}
            </div>
          </div>

          {/* Check-out Guide */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Check-out Guide</h3>
              <button
                onClick={() => handleAddStep('checkout')}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Step
              </button>
            </div>

            <div className="space-y-3">
              {checkoutSteps.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-xl">
                  <p className="text-sm">No steps yet. Click "Add Step" to create one.</p>
                </div>
              ) : (
                checkoutSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex items-start gap-3 p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleMoveStep(step.id, 'up', 'checkout')}
                        disabled={index === 0}
                        className="p-1 hover:bg-background rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleMoveStep(step.id, 'down', 'checkout')}
                        disabled={index === checkoutSteps.length - 1}
                        className="p-1 hover:bg-background rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{step.text}</p>
                      <div className="flex gap-2 mt-1">
                        {step.image && <span className="text-xs text-muted-foreground">📷 Image</span>}
                        {step.video && <span className="text-xs text-muted-foreground">🎥 Video</span>}
                        {step.voiceNote && <span className="text-xs text-muted-foreground">🎤 Voice</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditStep(step, 'checkout')}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteStep(step.id, 'checkout')}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Greeting Screen */}
      {subTab === 'greeting' && (
        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Background</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 px-4 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                  Upload Image
                </button>
                <button className="flex-1 py-2.5 px-4 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                  Choose Color
                </button>
              </div>
              <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center border border-border">
                <p className="text-sm text-muted-foreground">
                  Background Preview
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">
              Property Logo (Optional)
            </h3>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <svg
                className="w-10 h-10 text-muted-foreground mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm font-medium text-foreground mb-1">
                Upload Logo
              </p>
              <p className="text-xs text-muted-foreground">
                PNG or SVG, square recommended
              </p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">
              Short Description
            </h3>
            <textarea
              rows={3}
              placeholder="A brief description that appears on the greeting screen"
              className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
        </div>
      )}

      {/* Rule Modal */}
      {isRuleModalOpen && editingRule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {houseRules.find((r) => r.id === editingRule.id) ? 'Edit' : 'Add'} House Rule
              </h3>
              <button
                onClick={() => {
                  setIsRuleModalOpen(false);
                  setEditingRule(null);
                }}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={editingRule.icon}
                  onChange={(e) =>
                    setEditingRule({ ...editingRule, icon: e.target.value })
                  }
                  placeholder="🚭"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground text-2xl focus:outline-none focus:ring-2 focus:ring-ring"
                  maxLength={2}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter an emoji (e.g., 🚭, 🐾, 🔇, 🍷)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingRule.title}
                  onChange={(e) =>
                    setEditingRule({ ...editingRule, title: e.target.value })
                  }
                  placeholder="e.g., No smoking"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={editingRule.description || ''}
                  onChange={(e) =>
                    setEditingRule({
                      ...editingRule,
                      description: e.target.value,
                    })
                  }
                  placeholder="Provide additional details about this rule"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setIsRuleModalOpen(false);
                  setEditingRule(null);
                }}
                className="flex-1 py-2.5 px-4 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRule}
                disabled={!editingRule.title.trim()}
                className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step Modal */}
      {isStepModalOpen && editingStep && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {currentGuideType === 'checkin' ? 'Check-in' : 'Check-out'} Step
              </h3>
              <button
                onClick={() => {
                  setIsStepModalOpen(false);
                  setEditingStep(null);
                }}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Step Text <span className="text-destructive">*</span>
                </label>
                <textarea
                  rows={3}
                  value={editingStep.text}
                  onChange={(e) =>
                    setEditingStep({ ...editingStep, text: e.target.value })
                  }
                  placeholder="Describe this step..."
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Image (Optional)
                </label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <svg className="w-10 h-10 text-muted-foreground mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium text-foreground mb-1">Upload Image</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                  {editingStep.image && (
                    <p className="text-xs text-primary mt-2">✓ Image uploaded</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Video (Optional)
                </label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <svg className="w-10 h-10 text-muted-foreground mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium text-foreground mb-1">Upload Video</p>
                  <p className="text-xs text-muted-foreground">MP4, MOV up to 50MB</p>
                  {editingStep.video && (
                    <p className="text-xs text-primary mt-2">✓ Video uploaded</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Voice Note (Optional)
                </label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <svg className="w-10 h-10 text-muted-foreground mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <p className="text-sm font-medium text-foreground mb-1">Record Voice Note</p>
                  <p className="text-xs text-muted-foreground">MP3, WAV up to 10MB</p>
                  {editingStep.voiceNote && (
                    <p className="text-xs text-primary mt-2">✓ Voice note uploaded</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setIsStepModalOpen(false);
                  setEditingStep(null);
                }}
                className="flex-1 py-2.5 px-4 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStep}
                disabled={!editingStep.text.trim()}
                className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Step
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Memos Tab Content Component
function MemosTabContent({
  memos,
  setMemos,
  isMemoModalOpen,
  setIsMemoModalOpen,
  editingMemo,
  setEditingMemo,
}: {
  memos: Memo[];
  setMemos: (memos: Memo[]) => void;
  isMemoModalOpen: boolean;
  setIsMemoModalOpen: (open: boolean) => void;
  editingMemo: Memo | null;
  setEditingMemo: (memo: Memo | null) => void;
}) {
  const handleAddMemo = () => {
    setEditingMemo({
      id: Date.now().toString(),
      title: '',
      coverImage: undefined,
      descriptionBlocks: [],
    });
    setIsMemoModalOpen(true);
  };

  const handleEditMemo = (memo: Memo) => {
    setEditingMemo(memo);
    setIsMemoModalOpen(true);
  };

  const handleDeleteMemo = (id: string) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  const handleSaveMemo = () => {
    if (!editingMemo) return;

    if (memos.find((m) => m.id === editingMemo.id)) {
      // Update existing memo
      setMemos(memos.map((m) => (m.id === editingMemo.id ? editingMemo : m)));
    } else {
      // Add new memo
      setMemos([...memos, editingMemo]);
    }

    setIsMemoModalOpen(false);
    setEditingMemo(null);
  };

  const handleAddBlock = (type: 'text' | 'image' | 'video' | 'voice') => {
    if (!editingMemo) return;

    const newBlock: DescriptionBlock = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? '' : 'placeholder',
    };

    setEditingMemo({
      ...editingMemo,
      descriptionBlocks: [...editingMemo.descriptionBlocks, newBlock],
    });
  };

  const handleDeleteBlock = (blockId: string) => {
    if (!editingMemo) return;

    setEditingMemo({
      ...editingMemo,
      descriptionBlocks: editingMemo.descriptionBlocks.filter((b) => b.id !== blockId),
    });
  };

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down') => {
    if (!editingMemo) return;

    const index = editingMemo.descriptionBlocks.findIndex((b) => b.id === blockId);
    if (index === -1) return;

    const newBlocks = [...editingMemo.descriptionBlocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }

    setEditingMemo({ ...editingMemo, descriptionBlocks: newBlocks });
  };

  const handleUpdateBlockContent = (blockId: string, content: string) => {
    if (!editingMemo) return;

    setEditingMemo({
      ...editingMemo,
      descriptionBlocks: editingMemo.descriptionBlocks.map((b) =>
        b.id === blockId ? { ...b, content } : b
      ),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {memos.length} memo{memos.length !== 1 ? 's' : ''}
        </p>
        <button
          onClick={handleAddMemo}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Memo
        </button>
      </div>

      <div className="space-y-3">
        {memos.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            <p className="text-sm">No memos yet. Click "Add Memo" to create one.</p>
          </div>
        ) : (
          memos.map((memo) => (
            <div
              key={memo.id}
              className="bg-card border border-border rounded-xl p-4 hover:bg-muted/30 transition-colors group"
            >
              <div className="flex items-start gap-4">
                {memo.coverImage ? (
                  <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-primary/20"></div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-muted/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1">{memo.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {memo.descriptionBlocks.length > 0
                      ? memo.descriptionBlocks[0].content
                      : 'No description'}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {memo.descriptionBlocks.some((b) => b.type === 'image') && (
                      <span className="text-xs text-muted-foreground">📷 Images</span>
                    )}
                    {memo.descriptionBlocks.some((b) => b.type === 'video') && (
                      <span className="text-xs text-muted-foreground">🎥 Video</span>
                    )}
                    {memo.descriptionBlocks.some((b) => b.type === 'voice') && (
                      <span className="text-xs text-muted-foreground">🎤 Voice</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditMemo(memo)}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteMemo(memo.id)}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Memo Modal */}
      {isMemoModalOpen && editingMemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border max-w-2xl w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {memos.find((m) => m.id === editingMemo.id) ? 'Edit' : 'Add'} Memo
              </h3>
              <button
                onClick={() => {
                  setIsMemoModalOpen(false);
                  setEditingMemo(null);
                }}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={editingMemo.title}
                  onChange={(e) =>
                    setEditingMemo({ ...editingMemo, title: e.target.value })
                  }
                  placeholder="e.g., Coffee Machine Guide"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Cover Image (Optional)
                </label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <svg className="w-10 h-10 text-muted-foreground mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium text-foreground mb-1">Upload Cover Image</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-foreground">
                    Description Blocks
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddBlock('text')}
                      className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      title="Add text"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleAddBlock('image')}
                      className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      title="Add image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleAddBlock('video')}
                      className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      title="Add video"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleAddBlock('voice')}
                      className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      title="Add voice note"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {editingMemo.descriptionBlocks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-xl">
                      <p className="text-sm">No blocks yet. Add content blocks using the buttons above.</p>
                    </div>
                  ) : (
                    editingMemo.descriptionBlocks.map((block, index) => (
                      <div
                        key={block.id}
                        className="border border-border rounded-xl p-3 group hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleMoveBlock(block.id, 'up')}
                              disabled={index === 0}
                              className="p-1 hover:bg-background rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleMoveBlock(block.id, 'down')}
                              disabled={index === editingMemo.descriptionBlocks.length - 1}
                              className="p-1 hover:bg-background rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex-1">
                            {block.type === 'text' ? (
                              <textarea
                                rows={3}
                                value={block.content}
                                onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                                placeholder="Enter text..."
                                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                              />
                            ) : (
                              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                                <p className="text-xs text-muted-foreground">
                                  {block.type === 'image' && '📷 Image upload'}
                                  {block.type === 'video' && '🎥 Video upload'}
                                  {block.type === 'voice' && '🎤 Voice note'}
                                </p>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handleDeleteBlock(block.id)}
                            className="p-1 hover:bg-background rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setIsMemoModalOpen(false);
                  setEditingMemo(null);
                }}
                className="flex-1 py-2.5 px-4 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMemo}
                disabled={!editingMemo.title.trim()}
                className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Memo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Essentials Tab Content Component
function EssentialsTabContent({
  callouts,
  setCallouts,
  cards,
  setCards,
  quickWidgets,
  setQuickWidgets,
  memos,
  isCalloutModalOpen,
  setIsCalloutModalOpen,
  editingCallout,
  setEditingCallout,
  isCardModalOpen,
  setIsCardModalOpen,
  editingCard,
  setEditingCard,
  isWidgetModalOpen,
  setIsWidgetModalOpen,
  editingWidget,
  setEditingWidget,
}: {
  callouts: Callout[];
  setCallouts: (callouts: Callout[]) => void;
  cards: Card[];
  setCards: (cards: Card[]) => void;
  quickWidgets: QuickWidget[];
  setQuickWidgets: (widgets: QuickWidget[]) => void;
  memos: Memo[];
  isCalloutModalOpen: boolean;
  setIsCalloutModalOpen: (open: boolean) => void;
  editingCallout: Callout | null;
  setEditingCallout: (callout: Callout | null) => void;
  isCardModalOpen: boolean;
  setIsCardModalOpen: (open: boolean) => void;
  editingCard: Card | null;
  setEditingCard: (card: Card | null) => void;
  isWidgetModalOpen: boolean;
  setIsWidgetModalOpen: (open: boolean) => void;
  editingWidget: QuickWidget | null;
  setEditingWidget: (widget: QuickWidget | null) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Callouts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Callouts</h3>
          <button
            onClick={() => {
              setEditingCallout({
                id: Date.now().toString(),
                title: '',
                description: [],
                icon: '💡',
                bgColor: '#fef3c7',
              });
              setIsCalloutModalOpen(true);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Add Callout
          </button>
        </div>
        <div className="space-y-3">
          {callouts.map((callout, index) => (
            <div
              key={callout.id}
              className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
              style={{ backgroundColor: callout.bgColor }}
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      const newCallouts = [...callouts];
                      if (index > 0) {
                        [newCallouts[index - 1], newCallouts[index]] = [newCallouts[index], newCallouts[index - 1]];
                        setCallouts(newCallouts);
                      }
                    }}
                    disabled={index === 0}
                    className="p-1 hover:bg-background/50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      const newCallouts = [...callouts];
                      if (index < callouts.length - 1) {
                        [newCallouts[index], newCallouts[index + 1]] = [newCallouts[index + 1], newCallouts[index]];
                        setCallouts(newCallouts);
                      }
                    }}
                    disabled={index === callouts.length - 1}
                    className="p-1 hover:bg-background/50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className="text-3xl">{callout.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1">{callout.title}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {callout.description.map((block) => (
                      <p key={block.id}>{block.type === 'text' ? block.content : `[${block.type}]`}</p>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingCallout({ ...callout });
                      setIsCalloutModalOpen(true);
                    }}
                    className="p-2 hover:bg-background/50 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCallouts(callouts.filter((c) => c.id !== callout.id))}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {callouts.length === 0 && (
            <div className="bg-card border-2 border-dashed border-border rounded-xl p-8 text-center">
              <p className="text-muted-foreground text-sm">No callouts yet. Add your first callout to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Cards Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Cards</h3>
          <button
            onClick={() => {
              setEditingCard({
                id: Date.now().toString(),
                title: '',
                icon: '📌',
                description: '',
              });
              setIsCardModalOpen(true);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Add Card
          </button>
        </div>
        <div className="space-y-3">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      const newCards = [...cards];
                      if (index > 0) {
                        [newCards[index - 1], newCards[index]] = [newCards[index], newCards[index - 1]];
                        setCards(newCards);
                      }
                    }}
                    disabled={index === 0}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      const newCards = [...cards];
                      if (index < cards.length - 1) {
                        [newCards[index], newCards[index + 1]] = [newCards[index + 1], newCards[index]];
                        setCards(newCards);
                      }
                    }}
                    disabled={index === cards.length - 1}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className="text-2xl">{card.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1">{card.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{card.description}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingCard({ ...card });
                      setIsCardModalOpen(true);
                    }}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCards(cards.filter((c) => c.id !== card.id))}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {cards.length === 0 && (
            <div className="bg-card border-2 border-dashed border-border rounded-xl p-8 text-center">
              <p className="text-muted-foreground text-sm">No cards yet. Add your first card to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Widgets Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Quick Widgets</h3>
          <button
            onClick={() => {
              setEditingWidget({
                id: Date.now().toString(),
                memoId: memos.length > 0 ? memos[0].id : '',
                fullWidth: false,
              });
              setIsWidgetModalOpen(true);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Add Widget
          </button>
        </div>
        <div className="space-y-3">
          {quickWidgets.map((widget, index) => {
            const memo = memos.find((m) => m.id === widget.memoId);
            return (
              <div
                key={widget.id}
                className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        const newWidgets = [...quickWidgets];
                        if (index > 0) {
                          [newWidgets[index - 1], newWidgets[index]] = [newWidgets[index], newWidgets[index - 1]];
                          setQuickWidgets(newWidgets);
                        }
                      }}
                      disabled={index === 0}
                      className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        const newWidgets = [...quickWidgets];
                        if (index < quickWidgets.length - 1) {
                          [newWidgets[index], newWidgets[index + 1]] = [newWidgets[index + 1], newWidgets[index]];
                          setQuickWidgets(newWidgets);
                        }
                      }}
                      disabled={index === quickWidgets.length - 1}
                      className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{memo?.title || 'Unknown Memo'}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs ${widget.fullWidth ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {widget.fullWidth ? 'Full Width' : 'Half Width'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Quick link to memo page</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingWidget({ ...widget });
                        setIsWidgetModalOpen(true);
                      }}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setQuickWidgets(quickWidgets.filter((w) => w.id !== widget.id))}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {quickWidgets.length === 0 && (
            <div className="bg-card border-2 border-dashed border-border rounded-xl p-8 text-center">
              <p className="text-muted-foreground text-sm">No quick widgets yet. Add your first widget to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Callout Modal */}
      {isCalloutModalOpen && editingCallout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {callouts.find((c) => c.id === editingCallout.id) ? 'Edit Callout' : 'New Callout'}
              </h3>
              <button
                onClick={() => {
                  setIsCalloutModalOpen(false);
                  setEditingCallout(null);
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
                <input
                  type="text"
                  value={editingCallout.title}
                  onChange={(e) => setEditingCallout({ ...editingCallout, title: e.target.value })}
                  placeholder="e.g., Emergency Contact"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Icon</label>
                <input
                  type="text"
                  value={editingCallout.icon}
                  onChange={(e) => setEditingCallout({ ...editingCallout, icon: e.target.value })}
                  placeholder="Enter emoji"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-2xl"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={editingCallout.bgColor}
                    onChange={(e) => setEditingCallout({ ...editingCallout, bgColor: e.target.value })}
                    className="h-10 w-20 rounded-lg border border-input cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingCallout.bgColor}
                    onChange={(e) => setEditingCallout({ ...editingCallout, bgColor: e.target.value })}
                    placeholder="#fef3c7"
                    className="flex-1 px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description (Text)</label>
                <textarea
                  value={editingCallout.description.filter(b => b.type === 'text').map(b => b.content).join('\n')}
                  onChange={(e) => {
                    const textContent = e.target.value;
                    setEditingCallout({
                      ...editingCallout,
                      description: textContent.split('\n').filter(line => line.trim()).map((line, i) => ({
                        id: `${Date.now()}-${i}`,
                        type: 'text' as const,
                        content: line
                      }))
                    });
                  }}
                  placeholder="Enter description (one paragraph per line)"
                  rows={4}
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  setIsCalloutModalOpen(false);
                  setEditingCallout(null);
                }}
                className="flex-1 py-2.5 px-4 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editingCallout.title.trim()) return;
                  const exists = callouts.find((c) => c.id === editingCallout.id);
                  if (exists) {
                    setCallouts(callouts.map((c) => (c.id === editingCallout.id ? editingCallout : c)));
                  } else {
                    setCallouts([...callouts, editingCallout]);
                  }
                  setIsCalloutModalOpen(false);
                  setEditingCallout(null);
                }}
                disabled={!editingCallout.title.trim()}
                className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Callout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Modal */}
      {isCardModalOpen && editingCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl max-w-lg w-full">
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {cards.find((c) => c.id === editingCard.id) ? 'Edit Card' : 'New Card'}
              </h3>
              <button
                onClick={() => {
                  setIsCardModalOpen(false);
                  setEditingCard(null);
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
                <input
                  type="text"
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  placeholder="e.g., Heating & Cooling"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Icon</label>
                <input
                  type="text"
                  value={editingCard.icon}
                  onChange={(e) => setEditingCard({ ...editingCard, icon: e.target.value })}
                  placeholder="Enter emoji"
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-2xl"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                <textarea
                  value={editingCard.description}
                  onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                  placeholder="Enter description"
                  rows={4}
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>
            <div className="border-t border-border px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  setIsCardModalOpen(false);
                  setEditingCard(null);
                }}
                className="flex-1 py-2.5 px-4 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editingCard.title.trim() || !editingCard.description.trim()) return;
                  const exists = cards.find((c) => c.id === editingCard.id);
                  if (exists) {
                    setCards(cards.map((c) => (c.id === editingCard.id ? editingCard : c)));
                  } else {
                    setCards([...cards, editingCard]);
                  }
                  setIsCardModalOpen(false);
                  setEditingCard(null);
                }}
                disabled={!editingCard.title.trim() || !editingCard.description.trim()}
                className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Widget Modal */}
      {isWidgetModalOpen && editingWidget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl max-w-lg w-full">
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {quickWidgets.find((w) => w.id === editingWidget.id) ? 'Edit Widget' : 'New Widget'}
              </h3>
              <button
                onClick={() => {
                  setIsWidgetModalOpen(false);
                  setEditingWidget(null);
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Link to Memo *</label>
                <select
                  value={editingWidget.memoId}
                  onChange={(e) => setEditingWidget({ ...editingWidget, memoId: e.target.value })}
                  className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {memos.map((memo) => (
                    <option key={memo.id} value={memo.id}>
                      {memo.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Width</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingWidget({ ...editingWidget, fullWidth: false })}
                    className={`flex-1 py-2.5 px-4 border rounded-xl text-sm font-medium transition-all ${
                      !editingWidget.fullWidth
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    Half Width
                  </button>
                  <button
                    onClick={() => setEditingWidget({ ...editingWidget, fullWidth: true })}
                    className={`flex-1 py-2.5 px-4 border rounded-xl text-sm font-medium transition-all ${
                      editingWidget.fullWidth
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    Full Width
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-border px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  setIsWidgetModalOpen(false);
                  setEditingWidget(null);
                }}
                className="flex-1 py-2.5 px-4 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editingWidget.memoId) return;
                  const exists = quickWidgets.find((w) => w.id === editingWidget.id);
                  if (exists) {
                    setQuickWidgets(quickWidgets.map((w) => (w.id === editingWidget.id ? editingWidget : w)));
                  } else {
                    setQuickWidgets([...quickWidgets, editingWidget]);
                  }
                  setIsWidgetModalOpen(false);
                  setEditingWidget(null);
                }}
                disabled={!editingWidget.memoId}
                className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Widget
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
