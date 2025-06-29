import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    {
      name: 'name',
      required: true,
      type: 'text',
      label: 'store name',
      admin: {
        description: "This is the name of your store (e.g. Arman's Store). It will be used in the URL.",
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "This is the subdomain for the store (e.g. [slug].payloadcms.com). It must be unique across all stores.",
      }
    },
    {
      name: 'stripeAccountId',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'stripeDetailsSubmitted',
      type: 'checkbox',
      admin: {
        readOnly: true,
        description: "You cannot create products until you submit your Stripe details.",
      }
    }
  ],
}
