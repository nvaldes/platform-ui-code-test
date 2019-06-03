import { PhonePipe } from "./phone.pipe";

describe("PhonePipe", () => {
  it("should create an instance", () => {
    const pipe = new PhonePipe();
    expect(pipe).toBeTruthy();
  });
  it("should format 10-character strings as if they were US phone numbers", () => {
    const pipe = new PhonePipe();
    expect(pipe.transform("1234567890")).toBe("(123) 456-7890");
  });
  it("should not format shorter strings", () => {
    const pipe = new PhonePipe();
    expect(pipe.transform("1234")).toBe("1234");
  });
  it("should not format longer strings", () => {
    const pipe = new PhonePipe();
    expect(pipe.transform("abcdefghijklmnop")).toBe("abcdefghijklmnop");
  });
  it("should not format non-strings", () => {
    const pipe = new PhonePipe();
    expect(pipe.transform(1234567890)).toBe(1234567890);
  });
});
