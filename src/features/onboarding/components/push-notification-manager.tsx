import React from 'react';
import { CenteredConveniatLogo } from '@/features/onboarding/components/centered-conveniat-logo';
import { PushNotificationSubscriptionManager } from '@/features/onboarding/components/push-notification-subscription-manager';

export const PushNotificationManagerEntrypointComponent: React.FC<{
  callback: () => void;
  locale: 'de' | 'fr' | 'en';
}> = ({ callback, locale }) => {
  return (
    <div className="rounded-lg p-8 text-center">
      <CenteredConveniatLogo />

      <PushNotificationSubscriptionManager callback={callback} locale={locale} />

      <button onClick={callback} className="mt-3 font-semibold text-gray-400">
        überspringen
      </button>
    </div>
  );
};
