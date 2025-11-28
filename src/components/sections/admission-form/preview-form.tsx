import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import profilePhoto from "@/assets/dummy/1.png";
import portfolio1 from "@/assets/dummy/1.png";
import portfolio2 from "@/assets/dummy/1.png";
import portfolio3 from "@/assets/dummy/1.png";
import portfolio4 from "@/assets/dummy/1.png";
import portfolio5 from "@/assets/dummy/1.png";
import portfolio6 from "@/assets/dummy/1.png";

const PreviewForm = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="min-h-screen bg-background p-4 md:py-0 md:px-0">
            <div className="max-w-[1080px] ml-auto">
                {/* Main Content */}
                <div className="grid md:grid-cols-3 gap-6 bg-white p-6 rounded-b-lg shadow-sm">
                    {/* Left Column - Photo */}
                    <div className="md:col-span-1">
                        <div className="bg-accent rounded-t-lg p-6">
                            <h1 className="text-2xl font-bold text-accent-foreground mb-1">Review Application</h1>
                            <p className="text-sm text-muted-foreground">Click here for Application form format:</p>
                        </div>
                        <img
                            src={profilePhoto.src}
                            alt="Profile"
                            className="w-full rounded-lg shadow-md"
                        />
                        <button type="button" onClick={onClose}>back</button>
                    </div>

                    {/* Right Column - Details */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Personal Details */}
                        <section className="bg-accent p-4 rounded-lg">
                            <h2 className="text-lg font-bold text-primary mb-3">Personal Details</h2>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Name</p>
                                    <p className="font-medium text-foreground">Jay</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Father Name</p>
                                    <p className="font-medium text-foreground">Kishor</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Mother Name</p>
                                    <p className="font-medium text-foreground">Ketan</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Nationality</p>
                                    <p className="font-medium text-foreground">Indian</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Gender</p>
                                    <p className="font-medium text-foreground">Male</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Viswakarma Patidar (Patel)</p>
                                    <p className="font-medium text-foreground">Caste</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Date of Birth</p>
                                    <p className="font-medium text-foreground">07/04/1991</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Blood Group</p>
                                    <p className="font-medium text-foreground">NIOS School Board</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-muted-foreground">Address</p>
                                    <p className="font-medium text-foreground">
                                        Sateli Taluka Road,<br />
                                        Talego, Mehsana,<br />
                                        384315
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Languages & Interests */}
                        <section>
                            <h2 className="text-lg font-bold text-primary mb-3">Languages & Interests</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <Badge variant="secondary" className="mb-2">Hindi</Badge>
                                    <p className="text-muted-foreground">Yes</p>
                                </div>
                                <div>
                                    <Badge variant="secondary" className="mb-2">English</Badge>
                                    <p className="text-muted-foreground">Yes</p>
                                </div>
                            </div>
                        </section>

                        {/* Contact Details */}
                        <section className="bg-accent p-4 rounded-lg">
                            <h2 className="text-lg font-bold text-primary mb-3">Personal Details</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Name</p>
                                    <p className="font-medium text-foreground">Ravi Patidar</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Email</p>
                                    <p className="font-medium text-foreground">ravib881@gmail.com</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Contact</p>
                                    <p className="font-medium text-foreground">1234567890</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Address</p>
                                    <p className="font-medium text-foreground">
                                        Sateli Taluka Road,<br />
                                        Talego, Mehsana,<br />
                                        384315
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Education Details */}
                        <section className="bg-accent p-4 rounded-lg">
                            <h2 className="text-lg font-bold text-primary mb-3">Education Details</h2>
                            <div className="space-y-3 text-sm">
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-muted-foreground">12th Std</p>
                                        <p className="font-medium text-foreground">Commerce</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Institute</p>
                                        <p className="font-medium text-foreground">2020</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Percentage</p>
                                        <p className="font-medium text-foreground">58%</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-muted-foreground">Graduation</p>
                                        <p className="font-medium text-foreground">B.COM</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">College/School</p>
                                        <p className="font-medium text-foreground">HNGU, Patan</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Percentage</p>
                                        <p className="font-medium text-foreground">65%</p>
                                    </div>
                                </div>
                                <div className="border-t pt-3 mt-3">
                                    <p className="text-muted-foreground mb-2">Current Position</p>
                                    <p className="font-medium text-foreground">NIOS 10th & 12th BOARD TECHNOLOGY</p>
                                </div>
                            </div>
                        </section>

                        {/* Work Experience */}
                        <section>
                            <h2 className="text-lg font-bold text-primary mb-3">Work Experience</h2>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Company</p>
                                    <p className="font-medium text-foreground">Pratap</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Characterization/ Exp</p>
                                    <p className="font-medium text-foreground">5 Years</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Work detail find file name</p>
                                    <p className="font-medium text-foreground">Attendant</p>
                                </div>
                            </div>
                        </section>

                        {/* Portfolio Images */}
                        <section className="bg-accent p-4 rounded-lg">
                            <h2 className="text-lg font-bold text-primary mb-3">Portfolio images</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <img src={portfolio1.src} alt="Portfolio 1" className="w-full h-32 object-cover rounded-lg" />
                                <img src={portfolio2.src} alt="Portfolio 2" className="w-full h-32 object-cover rounded-lg" />
                                <img src={portfolio3.src} alt="Portfolio 3" className="w-full h-32 object-cover rounded-lg" />
                                <img src={portfolio4.src} alt="Portfolio 4" className="w-full h-32 object-cover rounded-lg" />
                                <img src={portfolio5.src} alt="Portfolio 5" className="w-full h-32 object-cover rounded-lg" />
                                <img src={portfolio6.src} alt="Portfolio 6" className="w-full h-32 object-cover rounded-lg" />
                            </div>
                        </section>

                        {/* Download Button */}
                        <div className="flex justify-start">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Download Application
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewForm;
