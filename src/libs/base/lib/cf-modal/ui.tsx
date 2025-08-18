"use client";

import { useUIState } from "@aces/store";
import { generateId } from "@aces/utils";
import { H4, Modal, ModalContent, ModalHeader } from "@aces/ui";
import {
  HubSpotForm,
  HubSpotFormProps,
  PardotForm,
  PardotFormProps,
} from "@aces/features";

import { CfModalUIProps } from ".";
import {
  CfRichTextSection,
  CfRichTextSectionUIProps,
} from "../cf-rich-text-section";

export const CfModalUI = ({
  internalTitle,
  modalHeader,
  modalBodyCollection,
  id,
  lang,
  preview,
}: CfModalUIProps) => {
  const { activeModal, setActiveModal } = useUIState();

  const modalId = generateId(internalTitle);
  const isOpen = activeModal === modalId;

  const handleSetOpen = (open: boolean) => {
    if (!open) setActiveModal(null);
    else setActiveModal(modalId);
  };

  return (
    <Modal open={isOpen} setOpen={handleSetOpen}>
      <>
        {modalHeader && (
          <ModalHeader>
            <H4>{modalHeader}</H4>
          </ModalHeader>
        )}
        <ModalContent>
          <>
            {modalBodyCollection.items.map((item) => {
              const typename = item.__typename;
              console.log(item);
              if (!typename) {
                return null;
              }

              const isCfRichText = (
                item: any,
              ): item is CfRichTextSectionUIProps => {
                return "bodyCopy" in item;
              };

              const isPardotForm = (item: any): item is PardotFormProps => {
                return "pardotFormUrl" in item;
              };

              const isHubSpotForm = (item: any): item is HubSpotFormProps => {
                return "hsPortalId" in item;
              };

              switch (typename) {
                case "RichTextSection":
                  if (isCfRichText(item)) {
                    return (
                      <CfRichTextSection
                        render="ui"
                        key={generateId(item.internalTitle)}
                        internalTitle={item.internalTitle}
                        alignment={item.alignment}
                        containerWidth={item.containerWidth}
                        backgroundColor={item.backgroundColor}
                        bodyCopy={item.bodyCopy}
                        border={item.border}
                        __typename={item.__typename}
                        nested={true}
                        id={id}
                        lang={lang}
                        preview={preview}
                      />
                    );
                  }
                case "PardotForm":
                  if (isPardotForm(item)) {
                    return (
                      <PardotForm
                        key={generateId(item.internalTitle)}
                        internalTitle={item.internalTitle}
                        pardotFormIframe={item.pardotFormIframe}
                        height={{ xs: "740px", md: "740px" }}
                      />
                    );
                  }
                case "HubSpotForm":
                  if (isHubSpotForm(item)) {
                    return (
                      <HubSpotForm
                        key={generateId(item.internalTitle)}
                        internalTitle={item.internalTitle}
                        hsPortalId={item.hsPortalId}
                        hsFormId={item.hsFormId}
                      />
                    );
                  }
                default:
                  return null;
              }
            })}
          </>
        </ModalContent>
      </>
    </Modal>
  );
};
