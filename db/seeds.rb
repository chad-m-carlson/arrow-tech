batch_numbers = Calibration.pluck(:batch).uniq

i = 0 

while i <= batch_numbers.length
  batch = Calibration.where(batch: batch_numbers[i])
  fd = batch.pluck(:final_date).find{!batch.nil?}
  puts fd
  batch.each do |b|
    if b.final_pass == true
      b.update(el_test_performed: true, vip_test_performed: true, vac_test_performed: true, acc_test_performed: true, final_date: fd)
    else
      b.update(el_test_performed: true, vip_test_performed: true, vac_test_performed: true, acc_test_performed: true, final_date: fd, due_date: nil)
    end
  end
  puts "Updated batch #{batch_numbers[i]}"
  i += 1
end
