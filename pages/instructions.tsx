import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chores = [
  {
    subject: "Living Room",
    instructions:
      "1. Tidy up the living room, putting away everything that's out, discard any trash, etc.\n2. Clean off the couches, vacuuming / scrubbing with fabric brush as needed.\n3. Wipe down the coffee tables with Clorox wipes.\n4. Mop or vacuum and Swiffer the floors, including vacuuming the entrance area carpet. Move furniture as needed to clean the floors thoroughly.\n5. Throw out any trash and recycling that's in the living room, empty the living room trash cans, then replace the trash bags.\n6. Organize the front entrance area by putting away all the shoes in the racks/shelves. Go through the mail by recycling / throwing away junk mail and giving any mail that's not yours to the appropriate brotha.",
  },
  {
    subject: "Kitchen Counters, Island, & Stove",
    instructions:
      "1. Clear the stove, wipe it off with paper towels, then spray it with cleaning solution. Let it marinate while you do the next steps.\n2. Clean up anything left on the counters and island, putting things away as needed.\nNOTE: Ensure the counters and island are completely clear of any items, and all spices are put away in the rack/shelf.\n3. Wipe the counters and island with wet paper towels to remove debris. Pick things up so that no surface is left uncleaned\n4. Clean the counters and island with Clorox wipes\n5. Scrub the stove clean with a coarse sponge. After all grime is scrubbed away, wipe it down with Clorox wipes, followed by paper towels.",
  },
  {
    subject: "Kitchen Sink, Drying Rack, & Dining Table",
    instructions:
      "1. Wipe down the sink, faucet, and surrounding counter area around the sink with Clorox wipes.\n2. Empty the drying rack and dry any dishes that are still wet.\n3. Wipe down the counter below the drying rack.\n4. Clear the dining table, then clean it with Clorox wipes.",
  },
  {
    subject: "Kitchen Floors & Trash",
    instructions:
      "1. Clean the kitchen floors with a vacuum, Swiffer, mop, or other thorough methods. Pick up any food or debris with paper towels and scrub away sticky spots with Clorox wipes. Move the trash can and any other furniture as needed to clean the floors effectively.\n2. Take out the trash and recycling to the bins, and replace the trash bags. Ensure you DO NOT put any trash bags in the recycling bin outside. You should empty the recycling bag then put the bag back in the trash can. Replace the recycling bag with a new one as needed.",
  },
  {
    subject: "Bathroom Sink Area, Toilet, & Trash",
    instructions:
      "Sink & Mirror\n1. Wipe down the counters with paper towels to remove debris\n2. Scrub the sink and faucets with Clorox wipes\nEnsure you pick things up so that no surface is left uncleaned. Don't forget to clean behind the faucets.\n3. Wipe down the mirror with Windex or similar\n\nToilet\n1. Apply toilet bowl cleaner to the underside of the bowl's rim. Let it sit for a few min while you do the following:\n2. Wipe down the flush handle and the entire outside of the toilet with Clorox wipes\n3. Wipe down the top and bottom of the toilet seat and lid with another Clorox wipe\nDon't forget to clean the area behind the hinge\n4. Scrub the bowl clean with the toilet brush\n5. Flush\n\nTrash\n1. Take the trash out to the bin\n2. Put in a new trash bag",
  },
  {
    subject: "Bathroom Shower & Floor",
    instructions:
      "1. Wipe down the top of the tub with paper towels if wet or has hair.\n2. Pick up the bathmat and wash/scrub it clean.\n3. Scrub the tub surface, removing any visible grime, mold, hair, etc.\n4. Wipe down the shower walls, handles, and head/faucet with a Clorox or wet paper towel.\n5. Scrub the floor clean, Swiffering and vacuuming as needed.\nPick up the trash can and bath mat to clean the floors effectively.\nMake sure you clean the floor around and behind the toilet.\n6. Vacuum the bath mat / rug.",
  },
];

export default function Instructions() {
  return (
    <>
      <Card className="m-2">
        <CardHeader>
          <CardTitle>Chores Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible defaultValue="item-0">
            {/* first accordion item (item-0) is open by default */}
            {chores.map((chore, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{chore.subject}</AccordionTrigger>
                <AccordionContent>
                  <p style={{ whiteSpace: "pre-line" }}>{chore.instructions}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
}
